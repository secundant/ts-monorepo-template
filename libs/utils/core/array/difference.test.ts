import { difference, symmetricDifference } from './difference';

describe('difference utils', () => {
  test('difference', () => {
    expect(difference([1, 2, 3, 4], [4, 5])).toEqual([1, 2, 3]);
    expect(difference([4, 5], [1, 2, 3, 4])).toEqual([5]);
    expect(difference([1, 2, 3, 1, 2, 3, 1, 2, 3, 4], [1, 2])).toEqual([3, 4]);
  });

  test('symmetricDifference', () => {
    expect(symmetricDifference([1, 2, 3], [1, 4])).toEqual([2, 3, 4]);
    expect(symmetricDifference([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(symmetricDifference([], [1, 2, 3])).toEqual([1, 2, 3]);
  });
});
