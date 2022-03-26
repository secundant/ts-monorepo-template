import { Button } from '@libs/ui/core/button';
import { Spaced } from '@libs/ui/core/grid';
import { Popover } from '@libs/ui/core/popover';
import { AddIcon, KeyboardArrowLeftIcon } from '@libs/ui/icons';
import { useState } from 'react';

export default function IndexPage() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spaced>
        <Popover open={!!anchorEl} anchorNode={anchorEl} onClose={() => setAnchorEl(null)}>
          Popover example
        </Popover>
        <Button onClick={e => setAnchorEl(e.target as HTMLElement)}>Open popover</Button>
        <Button>Hello</Button>
        <Button color="secondary">Hello</Button>
        <Button appearance="outlined">Hello</Button>
        <Button appearance="outlined" color="secondary">
          Hello
        </Button>
        <Button appearance="text">Hello</Button>
        <Button appearance="text" disabled>
          <AddIcon fontSize={64} />
          <KeyboardArrowLeftIcon color="#f00" />
          Hello
        </Button>
        <Button appearance="text" disabled color="secondary">
          Hello
        </Button>
      </Spaced>
    </div>
  );
}
