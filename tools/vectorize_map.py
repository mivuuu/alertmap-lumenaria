#!/usr/bin/env python3
"""Vectorize the 34 regions of the Lumenaria raster map.

The PNG remains the geographic source of truth.  Region seeds only identify
which enclosed area is which; OpenCV watershed and contour extraction derive
the actual coastlines and borders.

Run from the repository root:
    python tools/vectorize_map.py
"""

from __future__ import annotations

import argparse
import colorsys
from collections import defaultdict
from pathlib import Path
from xml.sax.saxutils import escape

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / "assets" / "lumenaria-map.png"
DEFAULT_SVG = ROOT / "assets" / "lumenaria-map.svg"
DEFAULT_DEBUG = ROOT / "assets" / "lumenaria-map-debug.png"
DEFAULT_LABELS_DEBUG = ROOT / "assets" / "vectorization-labels-debug.png"
DEFAULT_NO_STROKES_SVG = ROOT / "assets" / "lumenaria-map-no-strokes-debug.svg"

# One seed per mainland region.  Points are deliberately away from the white
# number glyphs; they are identifiers, not polygon geometry.
REGION_SEEDS = {
    3: (505, 406), 4: (928, 270), 5: (803, 372), 6: (738, 390),
    7: (698, 461), 8: (620, 350), 9: (592, 421), 10: (634, 450),
    11: (592, 492), 12: (525, 536), 13: (632, 565), 14: (703, 535),
    15: (917, 391), 16: (839, 456), 17: (802, 521), 18: (742, 568),
    19: (665, 627), 20: (704, 665), 21: (603, 688), 22: (586, 617),
    23: (515, 606), 24: (532, 665), 25: (454, 612), 26: (469, 658),
    27: (470, 699), 28: (530, 746), 29: (445, 747), 30: (473, 808),
    31: (530, 843), 32: (549, 891), 34: (479, 521),
}

# Disconnected territories need their own watershed marker.  Additional tiny
# components are assigned to the closest anchor below.
TERRITORY_SEEDS = [
    (1, 123, 548), (1, 326, 543),
    (2, 242, 660),
    (33, 113, 762), (33, 133, 756),
]

# Used only for assigning unseeded island components to the nearest territory.
ISLAND_ANCHORS = [
    (1, 123, 548), (1, 326, 543),
    (2, 242, 660),
    (4, 913, 235),
    (32, 548, 890),
    (33, 120, 758),
]

LABELS = [
    (1, 123, 548), (1, 328, 548), (2, 242, 660), (3, 516, 394),
    (4, 929, 276), (5, 800, 372), (6, 741, 398), (7, 697, 451),
    (8, 619, 369), (9, 603, 418), (10, 633, 444), (11, 594, 495),
    (12, 529, 527), (13, 633, 560), (14, 699, 528), (15, 914, 395),
    (16, 838, 454), (17, 799, 514), (18, 741, 560), (19, 660, 622),
    (20, 700, 659), (21, 604, 680), (22, 586, 613), (23, 516, 600),
    (24, 531, 660), (25, 454, 611), (26, 470, 651), (27, 470, 693),
    (28, 530, 739), (29, 445, 739), (30, 472, 801), (31, 530, 837),
    (32, 550, 887), (33, 125, 795), (34, 478, 513),
]

REGION_NAMES = {
    1: "Иудея", 2: "Салабимия", 3: "Эндор", 4: "Калантия",
    5: "Гесперия", 6: "Ориентия", 7: "Люциния", 8: "Сидерия",
    9: "Наяда", 10: "Клерополь", 11: "Солария", 12: "Селения",
    13: "Аргезия", 14: "Нереида", 15: "Альтерия", 16: "Сильвания",
    17: "Таврия", 18: "Валентия", 19: "Иллирия", 20: "Астралия",
    21: "Лимнида", 22: "Небулия", 23: "Кастелия", 24: "Медиолания",
    25: "Окцидентия", 26: "Виридия", 27: "Тенебрия", 28: "Монтания",
    29: "Мариния", 30: "Меридиония", 31: "Эстерия",
    32: "Джаннат-аль-Амн", 33: "Ойл", 34: "Гесперидия",
}


def build_land_mask(image: np.ndarray) -> np.ndarray:
    """Separate warm land pixels from the blue sea without using polygons."""
    blue, _green, red = cv2.split(image)
    chroma = red.astype(np.int16) - blue.astype(np.int16)
    land = (chroma > -8).astype(np.uint8) * 255

    # Join antialiased coast pixels and close small texture/label gaps.
    # 3px closes antialias gaps without joining the two tiny islands of region 33.
    land = cv2.morphologyEx(land, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    land = cv2.morphologyEx(land, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))

    count, labels, stats, _ = cv2.connectedComponentsWithStats(land, 8)
    cleaned = np.zeros_like(land)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    for component in range(1, count):
        area = stats[component, cv2.CC_STAT_AREA]
        pixels = labels == component
        # Remove white numbers printed over the sea, but retain tiny dark islands.
        dark_fraction = float(np.mean(gray[pixels] < 150)) if area else 0.0
        if area >= 10 and dark_fraction > 0.22:
            cleaned[pixels] = 255
    return cleaned


def nearest_land_point(mask: np.ndarray, point: tuple[int, int]) -> tuple[int, int]:
    x, y = point
    if 0 <= y < mask.shape[0] and 0 <= x < mask.shape[1] and mask[y, x]:
        return x, y
    ys, xs = np.nonzero(mask)
    index = np.argmin((xs - x) ** 2 + (ys - y) ** 2)
    return int(xs[index]), int(ys[index])


def make_elevation(image: np.ndarray, land: np.ndarray) -> np.ndarray:
    """Build a ridge image: dark drawn borders become watershed barriers."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Remove both the white digits and their dark drop shadows.  Otherwise the
    # watershed can mistake the outlined number glyph for a tiny closed region.
    white_text = (np.min(image, axis=2) > 125).astype(np.uint8) * 255
    white_text = cv2.dilate(white_text, np.ones((9, 9), np.uint8))
    gray = cv2.inpaint(gray, white_text, 7, cv2.INPAINT_TELEA)
    smooth = cv2.GaussianBlur(gray, (5, 5), 0)
    local_mean = cv2.GaussianBlur(smooth, (17, 17), 0)
    dark_ridge = cv2.subtract(local_mean, smooth)
    gx = cv2.Sobel(smooth, cv2.CV_32F, 1, 0, ksize=3)
    gy = cv2.Sobel(smooth, cv2.CV_32F, 0, 1, ksize=3)
    gradient = cv2.magnitude(gx, gy)
    gradient = cv2.normalize(gradient, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    ridge = cv2.addWeighted(dark_ridge, 2.8, gradient, 0.65, 0)
    ridge = cv2.GaussianBlur(ridge, (3, 3), 0)
    ridge[land == 0] = 255
    return cv2.cvtColor(ridge, cv2.COLOR_GRAY2BGR)


def add_component_seeds(
    land: np.ndarray,
    seeds: list[tuple[int, int, int]],
) -> list[tuple[int, int, int]]:
    """Seed every disconnected island so watershed cannot discard it as sea."""
    count, components, stats, centroids = cv2.connectedComponentsWithStats(land, 8)
    seeded_components = set()
    for _region_id, x, y in seeds:
        x, y = nearest_land_point(land, (x, y))
        seeded_components.add(int(components[y, x]))

    anchors = np.array([(x, y) for _rid, x, y in ISLAND_ANCHORS], dtype=np.float32)
    anchor_ids = [rid for rid, _x, _y in ISLAND_ANCHORS]
    for component in range(1, count):
        if component in seeded_components or stats[component, cv2.CC_STAT_AREA] < 10:
            continue
        cx, cy = centroids[component]
        region_id = anchor_ids[int(np.argmin((anchors[:, 0] - cx) ** 2 + (anchors[:, 1] - cy) ** 2))]
        distance = cv2.distanceTransform((components == component).astype(np.uint8), cv2.DIST_L2, 5)
        y, x = np.unravel_index(np.argmax(distance), distance.shape)
        seeds.append((region_id, int(x), int(y)))
    return seeds


def provisional_watershed(
    image: np.ndarray,
    land: np.ndarray,
) -> tuple[np.ndarray, np.ndarray, list[tuple[int, int, int]]]:
    """Find approximate regions; its boundary pixels are not final geometry."""
    seeds = [(rid, *point) for rid, point in REGION_SEEDS.items()] + list(TERRITORY_SEEDS)
    seeds = add_component_seeds(land, seeds)

    markers = np.zeros(land.shape, np.int32)
    markers[land == 0] = 1  # sea marker
    marker_to_region: dict[int, int] = {}
    marker_id = 2
    for region_id, x, y in seeds:
        x, y = nearest_land_point(land, (x, y))
        cv2.circle(markers, (x, y), 3, marker_id, -1)
        marker_to_region[marker_id] = region_id
        marker_id += 1

    segmented = cv2.watershed(make_elevation(image, land), markers)
    provisional = np.zeros(land.shape, np.int16)
    for marker, region_id in marker_to_region.items():
        provisional[segmented == marker] = region_id
    provisional[land == 0] = 0
    return provisional, segmented, seeds


def internal_boundary_band(
    provisional: np.ndarray,
    segmented: np.ndarray,
    land: np.ndarray,
) -> np.ndarray:
    """Return the uncertain raster stroke between regions, excluding coast."""
    watershed_lines = (segmented == -1) & (land > 0)
    neighbor_count = np.zeros(land.shape, np.uint8)
    neighborhood = np.ones((7, 7), np.uint8)
    for region_id in range(1, 35):
        reaches_line = cv2.dilate((provisional == region_id).astype(np.uint8), neighborhood)
        neighbor_count += (reaches_line > 0).astype(np.uint8)
    internal_lines = watershed_lines & (neighbor_count >= 2)

    # Include direct label transitions and erase the complete thick source-line
    # neighborhood.  This band is reconstructed globally in the next step.
    transitions = np.zeros(land.shape, np.uint8)
    different_x = (
        (provisional[:, 1:] != provisional[:, :-1])
        & (provisional[:, 1:] > 0)
        & (provisional[:, :-1] > 0)
    )
    different_y = (
        (provisional[1:, :] != provisional[:-1, :])
        & (provisional[1:, :] > 0)
        & (provisional[:-1, :] > 0)
    )
    transitions[:, 1:][different_x] = 1
    transitions[1:, :][different_y] = 1
    uncertain = internal_lines.astype(np.uint8) | transitions
    return cv2.dilate(uncertain, np.ones((7, 7), np.uint8)) & (land > 0)


def retain_seeded_cores(
    provisional: np.ndarray,
    boundary_band: np.ndarray,
    seeds: list[tuple[int, int, int]],
) -> np.ndarray:
    """Discard boundary-created slivers while preserving every seeded island."""
    cores = provisional.copy()
    cores[boundary_band > 0] = 0
    cleaned = np.zeros_like(cores)

    seeds_by_region: dict[int, list[tuple[int, int]]] = defaultdict(list)
    for region_id, x, y in seeds:
        seeds_by_region[region_id].append((x, y))

    for region_id in range(1, 35):
        candidate = (cores == region_id).astype(np.uint8)
        count, components, stats, _ = cv2.connectedComponentsWithStats(candidate, 8)
        if count <= 1:
            raise RuntimeError(f"Region {region_id} lost its confirmed interior")
        keep: set[int] = set()
        ys, xs = np.nonzero(candidate)
        for seed_x, seed_y in seeds_by_region[region_id]:
            if candidate[seed_y, seed_x]:
                keep.add(int(components[seed_y, seed_x]))
                continue
            # The uncertainty band may touch a seed in a small region.  Keep
            # the nearest confirmed component belonging to that same region.
            nearest = int(np.argmin((xs - seed_x) ** 2 + (ys - seed_y) ** 2))
            keep.add(int(components[ys[nearest], xs[nearest]]))
        for component in keep:
            if component > 0 and stats[component, cv2.CC_STAT_AREA] > 0:
                cleaned[components == component] = region_id
    return cleaned


def reconstruct_boundaries(cores: np.ndarray, land: np.ndarray) -> np.ndarray:
    """Assign every uncertain land pixel to its globally nearest region core."""
    if np.any((cores > 0) & (land == 0)):
        raise RuntimeError("Confirmed region core escaped the land mask")
    distance_input = np.ones(land.shape, np.uint8)
    distance_input[cores > 0] = 0
    _distance, nearest_source = cv2.distanceTransformWithLabels(
        distance_input,
        cv2.DIST_L2,
        cv2.DIST_MASK_PRECISE,
        labelType=cv2.DIST_LABEL_PIXEL,
    )
    source_labels = np.zeros(int(nearest_source.max()) + 1, np.int16)
    source_labels[nearest_source[cores > 0]] = cores[cores > 0]
    reconstructed = np.zeros_like(cores)
    reconstructed[land > 0] = source_labels[nearest_source[land > 0]]
    if np.any((land > 0) & (reconstructed == 0)):
        raise RuntimeError("Global boundary reconstruction left unlabeled land")
    return reconstructed


def segment_regions(image: np.ndarray, land: np.ndarray) -> tuple[dict[int, np.ndarray], np.ndarray]:
    provisional, segmented, seeds = provisional_watershed(image, land)
    boundary_band = internal_boundary_band(provisional, segmented, land)
    cores = retain_seeded_cores(provisional, boundary_band, seeds)
    final_labels = reconstruct_boundaries(cores, land)
    masks = {
        region_id: (final_labels == region_id).astype(np.uint8) * 255
        for region_id in range(1, 35)
    }
    return masks, final_labels


def remove_collinear(points: list[tuple[int, int]]) -> list[tuple[int, int]]:
    if len(points) < 4:
        return points
    result: list[tuple[int, int]] = []
    for index, current in enumerate(points):
        previous = points[index - 1]
        following = points[(index + 1) % len(points)]
        if (current[0] - previous[0]) * (following[1] - current[1]) != (
            current[1] - previous[1]
        ) * (following[0] - current[0]):
            result.append(current)
    return result


def trace_pixel_edges(mask: np.ndarray) -> list[list[tuple[int, int]]]:
    """Trace exact pixel-cell edges so neighbors share identical coordinates."""
    padded = np.pad(mask > 0, 1, constant_values=False)
    ys, xs = np.nonzero(padded)
    edges: set[tuple[tuple[int, int], tuple[int, int]]] = set()
    for py, px in zip(ys, xs):
        x, y = int(px - 1), int(py - 1)
        if not padded[py - 1, px]:
            edges.add(((x, y), (x + 1, y)))
        if not padded[py, px + 1]:
            edges.add(((x + 1, y), (x + 1, y + 1)))
        if not padded[py + 1, px]:
            edges.add(((x + 1, y + 1), (x, y + 1)))
        if not padded[py, px - 1]:
            edges.add(((x, y + 1), (x, y)))

    outgoing: dict[tuple[int, int], list[tuple[int, int]]] = defaultdict(list)
    for start, end in edges:
        outgoing[start].append(end)
    loops: list[list[tuple[int, int]]] = []
    direction = {(1, 0): 0, (0, 1): 1, (-1, 0): 2, (0, -1): 3}
    while edges:
        start_edge = min(edges)
        start, current = start_edge
        previous = start
        loop = [start]
        edges.remove(start_edge)
        while current != start:
            loop.append(current)
            candidates = [end for end in outgoing[current] if (current, end) in edges]
            if not candidates:
                raise RuntimeError(f"Open SVG boundary at {current}")
            incoming = direction[(current[0] - previous[0], current[1] - previous[1])]
            priority = {1: 0, 0: 1, 3: 2, 2: 3}  # right, straight, left, reverse
            next_point = min(
                candidates,
                key=lambda end: priority[(direction[(end[0] - current[0], end[1] - current[1])] - incoming) % 4],
            )
            edges.remove((current, next_point))
            previous, current = current, next_point
        loops.append(remove_collinear(loop))
    return loops


def mask_to_paths(mask: np.ndarray) -> list[str]:
    """Create one exact path per disconnected territory, including its holes."""
    count, components, stats, _ = cv2.connectedComponentsWithStats((mask > 0).astype(np.uint8), 8)
    paths: list[str] = []
    for component in range(1, count):
        if stats[component, cv2.CC_STAT_AREA] < 2:
            continue
        loops = trace_pixel_edges((components == component).astype(np.uint8))
        commands = []
        for loop in loops:
            commands.append("M " + " ".join(f"{x},{y}" for x, y in loop) + " Z")
        paths.append(" ".join(commands))
    return paths


def export_svg(
    masks: dict[int, np.ndarray],
    destination: Path,
    *,
    show_strokes: bool = True,
    debug_colors: bool = False,
) -> None:
    stroke_style = (
        "stroke:#26323c;stroke-width:1.25;stroke-linejoin:round;vector-effect:non-scaling-stroke;"
        if show_strokes
        else "stroke:none;"
    )
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="35 145 1000 780" role="img" aria-labelledby="map-title map-desc">',
        '  <title id="map-title">Интерактивная карта Люменарии</title>',
        '  <desc id="map-desc">34 региона Люменарии. Цвет региона показывает текущий статус тревоги.</desc>',
        '  <style>',
        '    .sea{fill:#101214}',
        f'    .region{{fill:#34383d;{stroke_style}cursor:default;transition:filter .14s ease}}',
        '    .region.clear{fill:#34383d}.region.yellow{fill:#e6b94a}.region.red{fill:#d84c4c}',
        '    .region:hover{filter:brightness(1.05)}',
        '    .region-labels{pointer-events:none;fill:#fff;font:600 14px Inter,system-ui,sans-serif;text-anchor:middle;dominant-baseline:middle;paint-order:stroke;stroke:#1a222a;stroke-width:2;stroke-linejoin:round}',
        '    .region-labels text[data-region-label-id="12"],.region-labels text[data-region-label-id="23"]{font-size:11px}',
        '    .region-labels text[data-region-label-id="24"],.region-labels text[data-region-label-id="25"],.region-labels text[data-region-label-id="34"]{font-size:9.5px}',
        '    .region-labels text[data-region-label-id="26"],.region-labels text[data-region-label-id="27"],.region-labels text[data-region-label-id="30"]{font-size:10px}',
        '    .region-labels text[data-region-label-id="32"]{font-size:8.5px}',
        '    @media(max-width:600px){.region-labels{font-weight:600;stroke-width:2}.region-labels text{font-size:17px}.region-labels text[data-region-label-id="12"],.region-labels text[data-region-label-id="23"],.region-labels text[data-region-label-id="24"],.region-labels text[data-region-label-id="25"],.region-labels text[data-region-label-id="26"],.region-labels text[data-region-label-id="27"],.region-labels text[data-region-label-id="30"],.region-labels text[data-region-label-id="34"]{font-size:12px}.region-labels text[data-region-label-id="9"],.region-labels text[data-region-label-id="10"],.region-labels text[data-region-label-id="32"]{font-size:9.5px}}',
        '    @media(prefers-reduced-motion:reduce){.region{transition:none}}',
        '  </style>',
        '  <rect class="sea" width="1080" height="1080"/>',
        '  <g id="regions">',
    ]
    for region_id in range(1, 35):
        paths = mask_to_paths(masks[region_id])
        blue, green, red = debug_color(region_id)
        inline_fill = f' style="fill:#{red:02x}{green:02x}{blue:02x}"' if debug_colors else ""
        lines.append(
            f'    <g class="region clear" data-region-id="{region_id}" data-status="clear"{inline_fill}>'
        )
        for path in paths:
            lines.append(f'      <path d="{escape(path)}" fill-rule="evenodd"/>')
        lines.append('    </g>')
    lines.extend(['  </g>', '  <g class="region-labels" aria-hidden="true">'])
    for region_id, x, y in LABELS:
        name = REGION_NAMES[region_id]
        font_size = 10 if len(name) > 14 else 11 if len(name) > 11 else 12 if len(name) > 8 else 14
        if region_id in {9, 10}:
            font_size = 8.5
        elif region_id == 33:
            font_size = 12
        lines.append(
            f'    <text x="{x}" y="{y}" font-size="{font_size}" '
            f'data-region-label-id="{region_id}">{escape(name)}</text>'
        )
    lines.extend(['  </g>', '</svg>', ''])
    destination.write_text("\n".join(lines), encoding="utf-8")


def debug_color(region_id: int) -> tuple[int, int, int]:
    hue = ((region_id * 137.508) % 360) / 360
    red, green, blue = colorsys.hsv_to_rgb(hue, 0.72, 0.95)
    return int(blue * 255), int(green * 255), int(red * 255)


def export_debug(image: np.ndarray, masks: dict[int, np.ndarray], destination: Path) -> None:
    debug = image.copy()
    original_text = (np.min(debug, axis=2) > 125).astype(np.uint8) * 255
    original_text = cv2.dilate(original_text, np.ones((9, 9), np.uint8))
    debug = cv2.inpaint(debug, original_text, 7, cv2.INPAINT_TELEA)
    for region_id, mask in masks.items():
        color_layer = np.full_like(debug, debug_color(region_id))
        pixels = mask > 0
        debug[pixels] = cv2.addWeighted(debug[pixels], 0.24, color_layer[pixels], 0.76, 0)
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cv2.drawContours(debug, contours, -1, (18, 24, 29), 2, cv2.LINE_AA)
    for region_id, x, y in LABELS:
        scale = 0.52 if region_id in {9, 10, 33} else 0.68
        text = str(region_id)
        size, _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, scale, 2)
        origin = (int(x - size[0] / 2), int(y + size[1] / 2))
        cv2.putText(debug, text, origin, cv2.FONT_HERSHEY_SIMPLEX, scale, (12, 15, 18), 5, cv2.LINE_AA)
        cv2.putText(debug, text, origin, cv2.FONT_HERSHEY_SIMPLEX, scale, (255, 255, 255), 2, cv2.LINE_AA)
    cv2.imwrite(str(destination), debug)


def export_labels_debug(final_labels: np.ndarray, destination: Path) -> None:
    """Render final pixel ownership with no source lines or SVG strokes."""
    debug = np.full((*final_labels.shape, 3), (71, 52, 23), np.uint8)
    for region_id in range(1, 35):
        debug[final_labels == region_id] = debug_color(region_id)
    for region_id, x, y in LABELS:
        scale = 0.52 if region_id in {9, 10, 33} else 0.68
        text = str(region_id)
        size, _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, scale, 2)
        origin = (int(x - size[0] / 2), int(y + size[1] / 2))
        cv2.putText(debug, text, origin, cv2.FONT_HERSHEY_SIMPLEX, scale, (12, 15, 18), 5, cv2.LINE_AA)
        cv2.putText(debug, text, origin, cv2.FONT_HERSHEY_SIMPLEX, scale, (255, 255, 255), 2, cv2.LINE_AA)
    cv2.imwrite(str(destination), debug)


def validate(image: np.ndarray, land: np.ndarray, masks: dict[int, np.ndarray]) -> None:
    stack = np.stack([(masks[region_id] > 0).astype(np.uint8) for region_id in range(1, 35)])
    coverage = np.sum(stack, axis=0)
    overlap = int(np.count_nonzero(coverage > 1))
    holes = int(np.count_nonzero((land > 0) & (coverage == 0)))
    outside = int(np.count_nonzero((land == 0) & (coverage > 0)))
    missing = [region_id for region_id in range(1, 35) if not np.any(masks[region_id])]
    components = {
        region_id: cv2.connectedComponents((masks[region_id] > 0).astype(np.uint8), 8)[0] - 1
        for region_id in range(1, 35)
    }
    expected_components = {region_id: 1 for region_id in range(1, 35)}
    expected_components.update({1: 8, 2: 3, 4: 5, 33: 2})
    component_mismatches = {
        region_id: (components[region_id], expected_components[region_id])
        for region_id in range(1, 35)
        if components[region_id] != expected_components[region_id]
    }
    suspicious: list[str] = []
    for region_id in range(1, 35):
        binary = (masks[region_id] > 0).astype(np.uint8)
        count, labels, stats, _ = cv2.connectedComponentsWithStats(binary, 8)
        for component in range(1, count):
            area = int(stats[component, cv2.CC_STAT_AREA])
            width = int(stats[component, cv2.CC_STAT_WIDTH])
            height = int(stats[component, cv2.CC_STAT_HEIGHT])
            aspect = max(width, height) / max(1, min(width, height))
            contours, _ = cv2.findContours(
                (labels == component).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE
            )
            perimeter = sum(cv2.arcLength(contour, True) for contour in contours)
            perimeter_area = perimeter * perimeter / max(1, area)
            if area < 2000 and aspect > 7 and perimeter_area > 100:
                suspicious.append(
                    f"{region_id}(area={area},bbox={width}x{height},aspect={aspect:.1f},p2/a={perimeter_area:.1f})"
                )
    print(f"regions=34 missing={missing}")
    print(f"overlap_pixels={overlap} uncovered_land_pixels={holes} outside_land_pixels={outside}")
    print("region_components=" + " ".join(f"{rid}:{components[rid]}" for rid in range(1, 35)))
    print(f"component_mismatches={component_mismatches}")
    print(f"suspicious_thin_components={suspicious}")

    labels = np.zeros(land.shape, np.uint8)
    for region_id, mask in masks.items():
        labels[mask > 0] = region_id
    internal_edges = np.zeros_like(labels, dtype=bool)
    internal_edges[:, 1:] |= (
        (labels[:, 1:] != labels[:, :-1]) & (labels[:, 1:] > 0) & (labels[:, :-1] > 0)
    )
    internal_edges[1:, :] |= (
        (labels[1:, :] != labels[:-1, :]) & (labels[1:, :] > 0) & (labels[:-1, :] > 0)
    )
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    text = (np.min(image, axis=2) > 125).astype(np.uint8) * 255
    text = cv2.dilate(text, np.ones((9, 9), np.uint8))
    gray = cv2.inpaint(gray, text, 7, cv2.INPAINT_TELEA)
    smooth = cv2.GaussianBlur(gray, (5, 5), 0)
    dark_ridges = cv2.subtract(cv2.GaussianBlur(smooth, (17, 17), 0), smooth)
    source_lines = ((dark_ridges > 5) & (land > 0)).astype(np.uint8)
    line_distance = cv2.distanceTransform(1 - source_lines, cv2.DIST_L2, 5)[internal_edges]
    p90 = float(np.percentile(line_distance, 90))
    within_five = float(np.mean(line_distance <= 5) * 100)
    print(f"border_match_p90_px={p90:.2f} borders_within_5px={within_five:.2f}%")
    if missing or overlap or holes or outside or component_mismatches:
        raise RuntimeError("Geometry validation failed")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--svg", type=Path, default=DEFAULT_SVG)
    parser.add_argument("--debug", type=Path, default=DEFAULT_DEBUG)
    parser.add_argument("--labels-debug", type=Path, default=DEFAULT_LABELS_DEBUG)
    parser.add_argument("--no-strokes-svg", type=Path, default=DEFAULT_NO_STROKES_SVG)
    args = parser.parse_args()

    image = cv2.imread(str(args.source), cv2.IMREAD_COLOR)
    if image is None:
        raise FileNotFoundError(args.source)
    if image.shape[:2] != (1080, 1080):
        raise ValueError(f"Expected 1080x1080 source, got {image.shape[1]}x{image.shape[0]}")

    land = build_land_mask(image)
    masks, final_labels = segment_regions(image, land)
    validate(image, land, masks)
    args.svg.parent.mkdir(parents=True, exist_ok=True)
    export_svg(masks, args.svg)
    export_svg(masks, args.no_strokes_svg, show_strokes=False, debug_colors=True)
    export_debug(image, masks, args.debug)
    export_labels_debug(final_labels, args.labels_debug)
    print(f"wrote {args.svg.relative_to(ROOT)}")
    print(f"wrote {args.debug.relative_to(ROOT)}")
    print(f"wrote {args.labels_debug.relative_to(ROOT)}")
    print(f"wrote {args.no_strokes_svg.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
