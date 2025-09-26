import { View, Text } from 'react-native';
import HeartIcon from '@/assets/icons/heart.svg';
import { useUserStore } from '@/lib/user/store';

export default function Index() {
  const userId = useUserStore((store) => store.userId);

  return (
    <View className="flex flex-1 items-center justify-center bg-blue-500">
      <HeartIcon className="size-20 color-pink-500" />
      <Text className="text-center font-bold text-3xl">User id {userId}</Text>
    </View>
  );
}
