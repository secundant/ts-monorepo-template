import { RegularButton, RegularButtonProps } from './regular-button';

export default {
  title: 'Components/Button'
};

export const Regular = (props: RegularButtonProps) => <RegularButton {...props} />;

Regular.args = {
  children: 'Button'
};
