import { Pressable, type PressableProps } from 'react-native';

export function SwipeButton(props: PressableProps) {
  return (
    <Pressable
      className="size-14 rounded-full bg-white p-2.5 shadow-drop active:bg-gray-200"
      {...props}
    />
  );
}
