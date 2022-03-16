import { RegularButton, RegularButtonProps } from './RegularButton';

export default {
  title: 'Components/Button'
};

export const Regular = (props: RegularButtonProps) => <RegularButton {...props} />;

Regular.args = {
  children: 'Button'
};
