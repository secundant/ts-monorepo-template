import { Dialog, DialogContent } from '../../core/dialog';
import { SvgIconProps } from '../../core/svg-icon';
import { IconPreviewButton } from './IconPreviewButton';
import { ComponentType, memo, useState } from 'react';

export interface IconsPreviewProps {
  components: Record<string, ComponentType<SvgIconProps>>;
}

export const IconsPreview = memo(({ components }: IconsPreviewProps) => {
  const [open, setOpen] = useState(false);
  const [SelectedIcon, setSelectedIcon] = useState<ComponentType<SvgIconProps> | null>(null);

  console.log({
    SelectedIcon,
    components
  });
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogContent>
          <div className="flex flex-row">
            <div className="h-full mr-4 w-32 flex-shrink-0 flex-grow-0 bg-gray-600/80 rounded-md flex p-8 text-8xl items-center justify-center text-white">
              {SelectedIcon && <SelectedIcon />}
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 text-gray-900 px-2 py-1 border border-gray-300 rounded-md">
                {`import { ${SelectedIcon?.displayName} } from "@libs/ui/icons";`}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {Object.entries(components).map(([name, Icon]) => (
        <IconPreviewButton
          key={name}
          name={name}
          Icon={Icon}
          onClick={() => {
            setSelectedIcon(Icon);
            setOpen(true);
          }}
        />
      ))}
    </>
  );
});

IconsPreview.displayName = 'IconsPreview';
