import { Typography } from './typography';
import { Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded'
  }
} as Meta;

export const List = () => (
  <>
    <Typography type="h1">H1. Heading 1</Typography>
    <Typography type="h2">H2. Heading 2</Typography>
    <Typography type="h3">H3. Heading 3</Typography>
    <Typography type="label" className="block">
      Label text
    </Typography>
    <Typography type="body" className="block">
      Body text
    </Typography>
  </>
);

export const Colors = () => (
  <>
    <Typography type="h3" className="text-red-300">
      H3. Heading 3 - red 300
    </Typography>
    <Typography type="h3" className="text-blue-600">
      H3. Heading 3 - blue 600
    </Typography>
    <Typography type="h3" className="text-primary-main">
      H3. Heading 3 - primary-main
    </Typography>
  </>
);
