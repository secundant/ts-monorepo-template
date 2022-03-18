import { getOwnerWindow } from '../../lib/dom';
import { Paper } from '../card';
import { Modal } from '../modal';
import { Grow } from '../transition';
import { adjustPosition, getPopoverRectOffset, getTransformOriginStyleByRect } from './lib';
import { PopoverElementPosition, PopoverOrigin, PopoverRect } from './types';
import { debounce } from '@libs/utils/core';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

export interface PopoverProps {
  open?: boolean;
  children: NonNullable<ReactNode>;
  anchorNode?: HTMLElement | null;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * @default 16
   */
  marginThreshold?: number;

  onClose?(): void;
}

export function Popover({
  children,
  marginThreshold = defaultMarginThreshold,
  transformOrigin = defaultTransformOrigin,
  anchorOrigin = defaultAnchorOrigin,
  onClose,
  open = false,
  anchorNode
}: PopoverProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  const getAnchorOffset = useCallback(() => {
    if (!anchorNode) return null;
    const rect = anchorNode.getBoundingClientRect();
    const offset = getPopoverRectOffset(rect, anchorOrigin);

    return {
      top: rect.top + offset.top,
      left: rect.left + offset.left
    };
  }, [anchorNode, anchorOrigin.vertical, anchorOrigin.horizontal]);

  const getTransformOffset = useCallback(
    (rect: PopoverRect) => getPopoverRectOffset(rect, transformOrigin),
    [transformOrigin.vertical, transformOrigin.horizontal]
  );

  const getPositionStyle = useCallback(
    (element: HTMLElement) => {
      if (!anchorNode) return null;
      const rect: PopoverRect = {
        width: element.offsetWidth,
        height: element.offsetHeight
      };
      const anchorOffset = getAnchorOffset()!;
      const transformOffset = getTransformOffset(rect);

      const position = {
        top: anchorOffset.top - transformOffset.top,
        left: anchorOffset.left - transformOffset.left
      } as PopoverElementPosition;

      position.right = position.left + rect.width;
      position.bottom = position.top + rect.height;

      // Window thresholds taking required margin into account
      const { innerWidth, innerHeight } = getOwnerWindow(anchorNode!);

      adjustPosition(
        transformOffset,
        position,
        {
          width: innerWidth,
          height: innerHeight
        },
        marginThreshold
      );

      return {
        top: `${Math.round(position.top)}px`,
        left: `${Math.round(position.left)}px`,
        transformOrigin: getTransformOriginStyleByRect(transformOffset)
      };
    },
    [anchorNode, getAnchorOffset, getTransformOffset, marginThreshold]
  );

  const syncElementStyles = useCallback(() => {
    const element = paperRef.current as any as HTMLElement;
    const position = element && getPositionStyle(element);

    if (!element || !position) return;
    Object.assign(element.style, position);
  }, [getPositionStyle]);

  useEffect(() => {
    if (open) {
      syncElementStyles();
    }
  });
  useEffect(() => {
    if (!open || !anchorNode) return;
    const handleResize = debounce(syncElementStyles);
    const window = getOwnerWindow(anchorNode);

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [anchorNode, open, syncElementStyles]);

  return (
    <Modal open={open} transition backdrop="invisible" onClose={onClose}>
      <Grow appear in={open} onEntering={syncElementStyles}>
        <Paper
          className="overflow-x-hidden overflow-y-auto absolute outline-none min-w-[16px] min-h-[16px] max-w-[calc(100%-32px)] max-h-[calc(100%-32px)]"
          ref={paperRef}
        >
          {children}
        </Paper>
      </Grow>
    </Modal>
  );
}

const defaultMarginThreshold = 16;
const defaultAnchorOrigin: PopoverOrigin = {
  vertical: 'end',
  horizontal: 'center'
};
const defaultTransformOrigin: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'center'
};
