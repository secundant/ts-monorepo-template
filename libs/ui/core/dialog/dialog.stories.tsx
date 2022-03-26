import { Button } from '../button';
import { Spaced } from '../grid';
import { DialogContent } from './content';
import { Dialog, DialogProps } from './dialog';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'Components/Dialog',
  component: Dialog
} as Meta;

export const WithButton: Story<DialogProps> = props => (
  <Dialog {...props}>
    <DialogContent>
      <div className="mb-2">Popover example</div>
      <Spaced>
        <Button>Action A</Button>
        <Button>Action B</Button>
      </Spaced>
    </DialogContent>
  </Dialog>
);
