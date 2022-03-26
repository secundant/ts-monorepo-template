import {
  PopoverElementPosition,
  PopoverOrigin,
  PopoverPositionType,
  PopoverRect,
  PopoverRectOffset
} from './types';

const getRectOffset = (rectValue: number, value: PopoverPositionType | number) => {
  if (typeof value === 'number') {
    return value;
  } else if (value === 'center') {
    return rectValue / 2;
  } else if (value === 'end') {
    return rectValue;
  }
  return 0;
};

export const getPopoverRectOffset = (
  rect: PopoverRect,
  position: PopoverOrigin
): PopoverRectOffset => ({
  top: getRectOffset(rect.height, position.vertical),
  left: getRectOffset(rect.width, position.horizontal)
});

export const getTransformOriginStyleByRect = ({ top, left }: PopoverRectOffset) => {
  return [left, top].map(n => `${n}px`).join(' ');
};

export function adjustPosition(
  offset: PopoverRectOffset,
  position: PopoverElementPosition,
  restrictions: PopoverRect,
  threshold: number
) {
  // Window thresholds taking required margin into account
  // Check if the vertical axis needs shifting
  adjustPositionAxis(offset, position, threshold, restrictions.height, 'top', 'bottom');
  // Check if the horizontal axis needs shifting
  adjustPositionAxis(offset, position, threshold, restrictions.width, 'left', 'right');
}

export function adjustPositionAxis(
  offset: PopoverRectOffset,
  position: PopoverElementPosition,
  threshold: number,
  restriction: number,
  startProperty: keyof PopoverRectOffset,
  endProperty: keyof PopoverElementPosition
) {
  const restrictionThreshold = restriction - threshold;

  if (position[startProperty] < threshold) {
    const diff = position[startProperty] - threshold;

    position[startProperty] -= diff;
    offset[startProperty] += diff;
  } else if (position[endProperty] > restrictionThreshold) {
    const diff = position[endProperty] - restrictionThreshold;

    position[startProperty] -= diff;
    offset[startProperty] += diff;
  }
}
