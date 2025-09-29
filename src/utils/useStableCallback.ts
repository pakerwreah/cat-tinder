import { useCallback, useLayoutEffect, useRef } from 'react';

import { type AnyFunction } from '@/utils/types';

export function useStableCallback<T extends AnyFunction | null | undefined>(callback: T): T {
  const ref = useRef<T>(callback);

  useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args: any[]): any => {
    return ref.current?.(...args);
  }, []) as T;
}
