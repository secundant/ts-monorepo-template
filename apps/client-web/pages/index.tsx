import { Button, RegularButton } from '@libs/ui/Button';
import { Spaced } from '@libs/ui/Grid';
import { AddIcon, KeyboardArrowLeftIcon } from '@libs/ui/icons';

export default function IndexPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spaced>
        <RegularButton>Regular</RegularButton>
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
