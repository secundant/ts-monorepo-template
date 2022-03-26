import { useEffect, useLayoutEffect } from 'react';

export const useUniversalLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
