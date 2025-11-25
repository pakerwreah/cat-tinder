import { memo } from 'react';
import { Pressable, type PressableProps } from 'react-native';

import { twMerge } from 'tailwind-merge';

export const SwipeButton = memo(function SwipeButton({ className, ...props }: PressableProps) {
  return (
    <Pressable
      className={twMerge(
        'size-14 items-center justify-center rounded-full bg-white shadow-drop active:bg-gray-200 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});
