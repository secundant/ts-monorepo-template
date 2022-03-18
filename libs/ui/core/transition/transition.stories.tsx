import { RegularButton } from '../button';
import { Paper } from '../card';
import { Grow as GrowTransition } from './grow';
import { Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';

export default {
  title: 'Components/Transition'
} as Meta;

export const Grow = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <RegularButton onClick={() => setOpen(!open)}>Click me</RegularButton>
      <GrowTransition in={open} appear>
        <Paper>Text example</Paper>
      </GrowTransition>
    </>
  );
};
