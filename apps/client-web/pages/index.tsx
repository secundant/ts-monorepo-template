import { RegularButton } from '@libs/ui/core/button';
import { Dialog, DialogContent, DialogHeader } from '@libs/ui/core/dialog';
import { Spaced } from '@libs/ui/core/grid';
import { HtmlInput } from '@libs/ui/core/input';
import { Popover } from '@libs/ui/core/popover';
import { Typography } from '@libs/ui/core/typography';
import { useState } from 'react';

export default function IndexPage() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col justify-center center text-left mx-auto max-w-6xl">
      <Typography type="h1">Heading 1</Typography>
      <Typography type="h2">Heading 2</Typography>
      <Typography type="h3">Heading 3</Typography>
      <Spaced wrap className="items-start">
        <Popover open={!!anchorEl} anchorNode={anchorEl} onClose={() => setAnchorEl(null)}>
          Popover example
        </Popover>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogHeader>Title</DialogHeader>
          <DialogContent>Content</DialogContent>
        </Dialog>
        <RegularButton onClick={e => setAnchorEl(e.target as HTMLElement)}>
          Open popover
        </RegularButton>
        <RegularButton onClick={() => setOpenDialog(true)}>Open dialog</RegularButton>
        <Spaced direction="row">
          <HtmlInput placeholder="A Input" />
          <div>
            <Typography type="label">Input</Typography>
            <HtmlInput placeholder="B Input" />
          </div>
          <HtmlInput placeholder="C Input" />
        </Spaced>
      </Spaced>
    </div>
  );
}
