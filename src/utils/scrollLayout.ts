/**
 * Pure calculation utilities for scroll-driven gallery layout,
 * card scaling, video scrubbing, and outro progress.
 */

export interface GridCell {
  imageIndex: number | null;
  colIndex: number;
  rowIndex: number;
}

/**
 * Deterministic scatter layout builder
 *
 * For each row r:
 * 1. a = (r * 2 + (r % 2)) % cols
 * 2. Place image in column a
 * 3. On every third row (r % 3 === 0), place second image in b = (a + 2) % cols (or (a + 1) % cols if b === a)
 * 4. Fill remaining cells with empty space
 * 5. Preserve original image ordering
 */
export function buildLayout(count: number, cols: number): GridCell[][] {
  if (count <= 0 || cols <= 0) return [];

  const rows: GridCell[][] = [];
  let placed = 0;
  let r = 0;

  while (placed < count) {
    const row: GridCell[] = Array.from({ length: cols }, (_, colIndex) => ({
      imageIndex: null,
      colIndex,
      rowIndex: r,
    }));

    const a = (r * 2 + (r % 2)) % cols;
    const hasSecond = r % 3 === 0 && placed + 1 < count;

    if (hasSecond) {
      let b = (a + 2) % cols;
      if (b === a) {
        b = (a + 1) % cols;
      }
      // Ensure left-to-right column order preserves chronological image index
      const col1 = Math.min(a, b);
      const col2 = Math.max(a, b);
      row[col1] = { imageIndex: placed, colIndex: col1, rowIndex: r };
      placed++;
      row[col2] = { imageIndex: placed, colIndex: col2, rowIndex: r };
      placed++;
    } else if (placed < count) {
      row[a] = { imageIndex: placed, colIndex: a, rowIndex: r };
      placed++;
    }

    rows.push(row);
    r++;
  }

  return rows;
}

export type ActiveSide = 'left' | 'right';

export interface VideoScrubState {
  activeSide: ActiveSide;
  progress: number;
  inDeadZone: boolean;
}

/**
 * Calculates pointer-based video scrubbing progress and active video side.
 */
export function calculateVideoScrubbing(
  pointerX: number,
  viewportWidth: number,
  lastActiveSide: ActiveSide = 'right'
): VideoScrubState {
  if (viewportWidth <= 0) {
    return { activeSide: lastActiveSide, progress: 0, inDeadZone: true };
  }

  const center = viewportWidth / 2;
  const deadZone = Math.max(30, viewportWidth * 0.05);
  const diff = pointerX - center;

  if (diff < -deadZone) {
    // Left of dead zone activates the right video
    const distance = -diff - deadZone;
    const maxDistance = Math.max(1, center - deadZone);
    const progress = Math.min(1, Math.max(0, distance / maxDistance));
    return {
      activeSide: 'right',
      progress,
      inDeadZone: false,
    };
  } else if (diff > deadZone) {
    // Right of dead zone activates the left video
    const distance = diff - deadZone;
    const maxDistance = Math.max(1, center - deadZone);
    const progress = Math.min(1, Math.max(0, distance / maxDistance));
    return {
      activeSide: 'left',
      progress,
      inDeadZone: false,
    };
  } else {
    // Inside dead zone: keep last active side
    return {
      activeSide: lastActiveSide,
      progress: 0,
      inDeadZone: true,
    };
  }
}

/**
 * Calculates card scale based on vertical viewport position
 */
export function calculateCardScale(top: number, bottom: number, vh: number): number {
  if (vh <= 0 || bottom <= 0 || top >= vh) {
    return 0;
  }
  const enter = (vh - top) / (vh * 0.6);
  const exit = bottom / (vh * 0.4);
  const scale = Math.min(enter, exit);
  return Math.max(0, Math.min(1, scale));
}

/**
 * Calculates outro phase progress:
 * (scrollY - vh - maxScroll) / (vh - 100), clamped between 0 and 1
 */
export function calculateOutroProgress(scrollY: number, vh: number, maxScroll: number): number {
  const denominator = Math.max(1, vh - 100);
  const raw = (scrollY - vh - maxScroll) / denominator;
  return Math.min(1, Math.max(0, raw));
}

/**
 * Calculates scroll spacer height:
 * vh + maxScroll + 2 * vh
 */
export function calculateSpacerHeight(vh: number, maxScroll: number): number {
  return vh + Math.max(0, maxScroll) + 2 * vh;
}
