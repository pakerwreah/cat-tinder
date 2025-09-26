import { View, Text } from 'react-native';
import HeartIcon from '@/assets/icons/heart.svg';

export default function Index() {
  return (
    <View className="flex flex-1 items-center justify-center bg-blue-500">
      <HeartIcon className="size-20 color-pink-500" />
      <Text className="font-bold text-3xl">Font style test</Text>
    </View>
  );
}
