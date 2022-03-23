import { TouchableElementProps } from '../../types';
import clsx from 'clsx';
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
      className={clsx(
        'bg-primary-main text-white shadow-el-sm rounded-md px-4 py-2',
        !disabled &&
          'transition hover:bg-primary-light focus:bg-primary-dark hover:shadow-el-md active:shadow-el-lg active:scale-95'
      )}
    >
      {children}
    </button>
  );
}
