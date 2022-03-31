import { includesIn, negate } from '../function/core';

export const exclude = <T>(target: T[], excluded: T[]): T[] =>
  target.filter(negate(includesIn(excluded)));
