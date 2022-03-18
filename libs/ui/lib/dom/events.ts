import { SyntheticEvent } from 'react';

export const stopEvent = (e: Event | SyntheticEvent) => {
  e.stopPropagation();
  e.preventDefault();
};
