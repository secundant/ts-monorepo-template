import { SvgIconProps } from '../../SvgIcon';
import clsx from 'clsx';
import { ComponentType, memo } from 'react';

export interface IconPreviewButtonProps {
  Icon: ComponentType<SvgIconProps>;
  name: string;
}

export const IconPreviewButton = memo(({ Icon, name }: IconPreviewButtonProps) => (
  <div
    className={clsx(
      'h-32 w-32 m-4 p-2 rounded-md shadow-md bg-white flex flex-col items-center justify-center text-center border border-gray-300',
      'transition cursor-pointer hover:shadow-lg hover:bg-gray-200 active:shadow-xl active:bg-gray-300'
    )}
  >
    <div className="mx-auto mb-4 text-5xl">
      <Icon fontSize="current" />
    </div>
    <div className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis">{name}</div>
  </div>
));

IconPreviewButton.displayName = 'IconPreviewButton';
