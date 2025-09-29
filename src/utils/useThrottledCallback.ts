import { useRef } from 'react';

import { type AnyFunction } from '@/utils/types';
import { useStableCallback } from '@/utils/useStableCallback';

export function useThrottledCallback<T extends AnyFunction>(callback: T, limit: number): T {
  const lastCallRef = useRef(0);

  return useStableCallback((...args: any[]) => {
    const now = Date.now();
    if (now - lastCallRef.current >= limit) {
      lastCallRef.current = now;
      callback(...args);
    }
  }) as T;
}
