import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLayout,
  calculateVideoScrubbing,
  calculateCardScale,
  calculateOutroProgress,
  calculateSpacerHeight,
} from './scrollLayout.ts';

test('buildLayout correctly places all items deterministically in scattered grid', () => {
  const count = 10;
  const cols = 4;
  const layout = buildLayout(count, cols);

  // Collect placed image indices
  const placedIndices: number[] = [];
  for (const row of layout) {
    assert.equal(row.length, cols, 'Each row must have cols cells');
    for (const cell of row) {
      if (cell.imageIndex !== null) {
        placedIndices.push(cell.imageIndex);
      }
    }
  }

  assert.equal(placedIndices.length, count, 'Must place exactly 10 images');
  // Check sequential ordering
  for (let i = 0; i < count; i++) {
    assert.equal(placedIndices[i], i, `Image index ${i} must be placed in order`);
  }

  // Row 0 check: r = 0, a = 0. r % 3 === 0, b = (0 + 2) % 4 = 2.
  assert.equal(layout[0][0].imageIndex, 0);
  assert.equal(layout[0][2].imageIndex, 1);
  assert.equal(layout[0][1].imageIndex, null);
  assert.equal(layout[0][3].imageIndex, null);
});

test('calculateVideoScrubbing handles center dead zone and edges properly', () => {
  const width = 1000;
  // center is 500, deadZone is Math.max(30, 50) = 50.
  // Dead zone is from 450 to 550.

  // Center dead zone
  const deadZoneState = calculateVideoScrubbing(500, width, 'right');
  assert.equal(deadZoneState.inDeadZone, true);
  assert.equal(deadZoneState.activeSide, 'right');

  // Left of dead zone (e.g. pointer at 200, diff is -300)
  // Activates right video
  const leftPointer = calculateVideoScrubbing(200, width, 'right');
  assert.equal(leftPointer.activeSide, 'right');
  assert.equal(leftPointer.inDeadZone, false);
  assert.ok(leftPointer.progress > 0 && leftPointer.progress < 1);

  // Far left edge (pointer at 0)
  const farLeft = calculateVideoScrubbing(0, width, 'right');
  assert.equal(farLeft.activeSide, 'right');
  assert.equal(farLeft.progress, 1);

  // Right of dead zone (e.g. pointer at 800, diff is +300)
  // Activates left video
  const rightPointer = calculateVideoScrubbing(800, width, 'right');
  assert.equal(rightPointer.activeSide, 'left');
  assert.equal(rightPointer.inDeadZone, false);
  assert.ok(rightPointer.progress > 0 && rightPointer.progress < 1);

  // Far right edge (pointer at 1000)
  const farRight = calculateVideoScrubbing(1000, width, 'left');
  assert.equal(farRight.activeSide, 'left');
  assert.equal(farRight.progress, 1);
});

test('calculateCardScale calculates enter, center, and exit scale correctly', () => {
  const vh = 1000;

  // Fully offscreen below (top >= vh)
  assert.equal(calculateCardScale(1100, 1500, vh), 0);

  // Fully offscreen above (bottom <= 0)
  assert.equal(calculateCardScale(-500, -100, vh), 0);

  // Perfectly centered (e.g. top = 300, bottom = 700)
  // enter = (1000 - 300) / 600 = 700 / 600 > 1 => 1
  // exit = 700 / 400 > 1 => 1
  const centered = calculateCardScale(300, 700, vh);
  assert.equal(centered, 1);

  // Partially entering from bottom
  const entering = calculateCardScale(800, 1200, vh);
  // enter = (1000 - 800) / 600 = 200 / 600 = 0.333...
  assert.ok(entering > 0.3 && entering < 0.35);
});

test('calculateOutroProgress clamps cleanly between 0 and 1', () => {
  const vh = 900;
  const maxScroll = 2000;

  // Before outro
  assert.equal(calculateOutroProgress(1000, vh, maxScroll), 0);

  // Exactly at outro start
  assert.equal(calculateOutroProgress(vh + maxScroll, vh, maxScroll), 0);

  // Midway through outro
  const mid = calculateOutroProgress(vh + maxScroll + (vh - 100) / 2, vh, maxScroll);
  assert.ok(Math.abs(mid - 0.5) < 0.01);

  // Beyond outro
  assert.equal(calculateOutroProgress(vh + maxScroll + 2000, vh, maxScroll), 1);
});

test('calculateSpacerHeight calculates dynamic height', () => {
  const vh = 900;
  const maxScroll = 1500;
  assert.equal(calculateSpacerHeight(vh, maxScroll), 900 + 1500 + 1800);
});
