import { View, Text, Pressable, PressableProps } from 'react-native';
import XIcon from '@/assets/icons/x.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import { useUserStore } from '@/lib/user/store';

export default function Index() {
  const userId = useUserStore((store) => store.userId);

  return (
    <View className="flex flex-1 items-center justify-center gap-16">
      <View className="aspect-[0.8] w-full justify-center bg-gray-200">
        <Text className="text-center font-bold text-3xl">User id {userId}</Text>
      </View>
      <View className="flex-row gap-12">
        <ActionButton>
          <XIcon className="size-full color-[#E16359]" />
        </ActionButton>
        <ActionButton>
          <HeartIcon className="size-full color-[#6BD88E]" />
        </ActionButton>
      </View>
    </View>
  );
}

function ActionButton(props: PressableProps) {
  return (
    <Pressable
      className="size-14 rounded-full bg-white p-3 shadow-drop active:bg-gray-200"
      {...props}
    />
  );
}
