import { SvgIconProps } from '../../core/svg-icon';
import clsx from 'clsx';
import { ComponentType, memo } from 'react';

export interface IconPreviewButtonProps {
  Icon: ComponentType<SvgIconProps>;
  name: string;
  onClick?(): void;
}

export const IconPreviewButton = memo(({ Icon, name, onClick }: IconPreviewButtonProps) => (
  <div className="flex flex-col w-24 m-4 items-stretch justify-start">
    <button
      className={clsx(
        'mb-4 h-24 rounded-md shadow-md bg-white text-5xl flex items-center justify-center border border-gray-300',
        'transition cursor-pointer hover:shadow-lg hover:bg-gray-200 active:shadow-xl active:bg-gray-300'
      )}
      tabIndex={0}
      onClick={onClick}
    >
      <Icon fontSize="current" />
    </button>
    <div
      className="w-full text-center text-sm text-gray-800 whitespace-nowrap overflow-ellipsis overflow-hidden"
      title={name}
    >
      {name}
    </div>
  </div>
));

IconPreviewButton.displayName = 'IconPreviewButton';
