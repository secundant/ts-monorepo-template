import { TouchableElementProps } from '../../types';
import { ReactNode } from 'react';

export interface RegularButtonProps extends TouchableElementProps<HTMLButtonElement> {
  children: NonNullable<ReactNode>;
}

export function RegularButton({
  children,
  onClick,
  disabled,
  onMouseUp,
  onMouseDown
}: RegularButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className="bg-primary-main hover:bg-primary-light focus:bg-primary-dark shadow-md hover:shadow:md active:shadow-lg transition text-white rounded-md px-4 py-2"
    >
      {children}
    </button>
  );
}
