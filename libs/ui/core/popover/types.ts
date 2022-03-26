export type PopoverPositionType = 'start' | 'center' | 'end';
export interface PopoverRect {
  width: number;
  height: number;
}

export interface PopoverOrigin {
  vertical: PopoverPositionType;
  horizontal: PopoverPositionType;
}

export interface PopoverRectOffset {
  top: number;
  left: number;
}

export interface PopoverElementPosition extends PopoverRectOffset {
  right: number;
  bottom: number;
}
