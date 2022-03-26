import { Button } from '../button';
import { Spaced } from '../grid';
import { Popover } from './popover';
import { Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';

export default {
  title: 'Components/Popover',
  component: Popover
} as Meta;

export const WithButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Popover open={!!anchorEl} anchorNode={anchorEl} onClose={() => setAnchorEl(null)}>
        <div className="mb-2">Popover example</div>
        <Spaced>
          <Button>Action A</Button>
          <Button>Action B</Button>
        </Spaced>
      </Popover>
      <Button onClick={e => setAnchorEl(e.target as HTMLElement)}>Click me</Button>
    </>
  );
};
