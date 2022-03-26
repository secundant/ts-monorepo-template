import { Spaced } from '../grid';
import { Button, ButtonProps } from './button';

export default {
  title: 'Components/Button'
};

export const Appearance = (props: ButtonProps) => (
  <Spaced>
    <Button {...props} appearance="contained">
      Contained
    </Button>
    <Button {...props} appearance="outlined">
      Outlined
    </Button>
    <Button {...props} appearance="text">
      Text
    </Button>
  </Spaced>
);

Appearance.args = {
  children: 'Button'
};
