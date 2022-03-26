import { Button } from '../button';
import { Paper } from '../card';
import { Spaced } from '../grid';
import { Typography } from '../typography';
import { Collapse } from './Collapse';
import { Transition } from './transition';
import { Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';

export default {
  title: 'Components/Transition'
} as Meta;

export const Grow = () => {
  const [open, setOpen] = useState<string[]>([]);
  const toggleBy = (value: string) => () =>
    setOpen(prev => (prev.includes(value) ? prev.filter(p => p !== value) : prev.concat(value)));
  const isOpen = (value: string) => open.includes(value);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Spaced>
          <Button onClick={toggleBy('Grow')}>Grow</Button>
          <Button onClick={toggleBy('Fade')}>Fade</Button>
          <Button onClick={toggleBy('Collapse')}>Collapse</Button>
        </Spaced>
      </div>
      <div className="flex items-stretch justify-between p-4 bg-gray-200 rounded-xl">
        <div>
          <Typography type="h5">Grow</Typography>
          <Transition type="Grow" open={isOpen('Grow')}>
            <Paper className="m-4 w-24 h-24" />
          </Transition>
        </div>
        <div>
          <Typography type="h5">Fade</Typography>
          <Transition type="Fade" open={isOpen('Fade')}>
            <Paper className="m-4 w-24 h-24" />
          </Transition>
        </div>
        <div>
          <Typography type="h5">Collapse</Typography>
          <Collapse open={isOpen('Collapse')}>
            <Paper className="mt-0 m-4 w-24 h-24" />
          </Collapse>
        </div>
      </div>
    </div>
  );
};
