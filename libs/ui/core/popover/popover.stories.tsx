import { RegularButton } from '../button';
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
          <RegularButton>Action A</RegularButton>
          <RegularButton>Action B</RegularButton>
        </Spaced>
      </Popover>
      <RegularButton onClick={e => setAnchorEl(e.target as HTMLElement)}>Click me</RegularButton>
    </>
  );
};
