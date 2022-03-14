import { Button, RegularButton } from '@libs/ui/core/Button';
import { Spaced } from '@libs/ui/core/Grid';

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
          Hello
        </Button>
        <Button appearance="text" disabled color="secondary">
          Hello
        </Button>
      </Spaced>
    </div>
  );
}
