import { Pressable, type PressableProps } from 'react-native';

import { twMerge } from 'tailwind-merge';

export function SwipeButton({ className, ...props }: PressableProps) {
  return (
    <Pressable
      className={twMerge(
        'size-14 items-center justify-center rounded-full bg-white shadow-drop active:bg-gray-200',
        className,
      )}
      {...props}
    />
  );
}
