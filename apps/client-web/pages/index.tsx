import { Button } from '@libs/ui/core/button';
import { Dialog, DialogContent, DialogHeader } from '@libs/ui/core/dialog';
import { Spaced } from '@libs/ui/core/grid';
import { IconButton } from '@libs/ui/core/icon-button';
import { HtmlInput } from '@libs/ui/core/input';
import { Popover, usePopover } from '@libs/ui/core/popover';
import { Typography } from '@libs/ui/core/typography';
import { getHotkeyHandler, useGlobalHotkey } from '@libs/ui/hooks/keyboard';
import { NotificationsIcon, VisibilityIcon, VisibilityOffIcon } from '@libs/ui/icons';
import { KeyboardEvent, useState } from 'react';

export default function IndexPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const examplePopup = usePopover({ id: 'example' });

  useGlobalHotkey(
    [
      ['Mod+K', () => setOpenDialog(prev => !prev)],
      ['Mod+L', examplePopup.close]
    ],
    [examplePopup.close]
  );
  return (
    <div className="w-screen h-screen flex flex-col justify-center center text-left mx-auto max-w-6xl">
      <Typography type="h1">Heading 1</Typography>
      <Typography type="h2">Heading 2</Typography>
      <Typography type="h3">Heading 3</Typography>
      <Spaced wrap className="items-start">
        <Popover {...examplePopup.popoverProps}>
          Popover example
          <Spaced direction="column" size={6}>
            <p>Press Cmd+L for exit</p>
            <Button onClick={examplePopup.close}>Close</Button>
          </Spaced>
        </Popover>
        <Dialog open={openDialog} fullWidth maxWidth="md" onClose={() => setOpenDialog(false)}>
          <DialogHeader>Dialog title example</DialogHeader>
          <DialogContent>Content</DialogContent>
        </Dialog>
        <Button>Just a button</Button>
        <Button color="error" {...examplePopup.triggerProps}>
          Open popover
        </Button>
        <Button color="warning" onClick={() => setOpenDialog(true)}>
          Open dialog (or press <strong>Cmd + K</strong>)
        </Button>
      </Spaced>
      <div className="my-8">
        <Spaced direction="row">
          <IconButton>
            <VisibilityOffIcon />
          </IconButton>
          <IconButton className="text-green-800">
            <VisibilityIcon />
          </IconButton>
          <IconButton className="text-cyan-700">
            <VisibilityOffIcon />
          </IconButton>
          <IconButton className="text-yellow-800">
            <VisibilityIcon />
          </IconButton>
          <IconButton color="secondary">
            <VisibilityIcon />
          </IconButton>
          <IconButton color="warning">
            <VisibilityIcon />
          </IconButton>
        </Spaced>
      </div>
      <div className="my-6">
        <Spaced direction="row">
          <Button>Button</Button>
          <Button color="secondary">Button</Button>
          <Button appearance="outlined">Button</Button>
          <Button appearance="outlined" color="secondary">
            Button
          </Button>
          <Button appearance="text">Button</Button>
          <Button appearance="text" color="error">
            Button
          </Button>
        </Spaced>
      </div>
      <div className="my-6">
        <Spaced direction="row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Spaced>
      </div>
      <div className="my-6">
        <Spaced direction="row">
          <Button appearance="outlined" size="sm">
            Small
          </Button>
          <Button appearance="outlined" size="md">
            Medium
          </Button>
          <Button appearance="outlined" size="lg">
            Large
          </Button>
        </Spaced>
      </div>
      <div className="my-6">
        <Spaced direction="row">
          <Button appearance="text" size="sm">
            Small
          </Button>
          <Button appearance="text" size="md">
            Medium
          </Button>
          <Button appearance="text" size="lg">
            Large
          </Button>
        </Spaced>
      </div>
      <div className="my-6">
        <Spaced direction="row">
          <IconButton size="sm">
            <NotificationsIcon />
          </IconButton>
          <IconButton size="md">
            <NotificationsIcon />
          </IconButton>
          <IconButton size="lg">
            <NotificationsIcon />
          </IconButton>
        </Spaced>
      </div>
      <Spaced direction="row">
        <HtmlInput
          size="sm"
          placeholder="Press ESC for clear"
          onKeyDown={getHotkeyHandler([
            [
              'Escape',
              (e: KeyboardEvent<HTMLInputElement>) => {
                e.currentTarget.value = '';
              }
            ]
          ])}
        />
        <div>
          <Typography type="label">Input</Typography>
          <HtmlInput placeholder="B Input" size="md" />
        </div>
        <HtmlInput placeholder="C Input" size="sm" />
        <HtmlInput placeholder="C Input" value="12345" disabled />
        <HtmlInput placeholder="C Input" disabled />
      </Spaced>
    </div>
  );
}
