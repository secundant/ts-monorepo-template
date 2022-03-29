export function difference<T>(targetA: T[], targetB: T[]): T[] {
  const set = new Set<T>();

  for (let index = 0; index < targetA.length; index++) {
    if (targetB.indexOf(targetA[index]) === -1) {
      set.add(targetA[index]);
    }
  }
  return Array.from(set);
}

export function symmetricDifference<T>(targetA: T[], targetB: T[]) {
  return difference(targetA, targetB).concat(difference(targetB, targetA));
}
