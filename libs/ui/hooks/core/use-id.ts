import { useMemo } from 'react';

export function useId(id?: string) {
  return useMemo(() => id ?? randomId(), [id]);
}

export const randomId = () => `id-${Math.random().toString(36).slice(2, 11)}`;
