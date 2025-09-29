import { useCallback } from 'react';
import { Button, Text, View } from 'react-native';

import { useUserStore } from '@/lib/user/store';

export default function ProfileScreen() {
  const logout = useCallback(() => {
    useUserStore.getState().reset();
  }, []);

  return (
    <View className="gap-32">
      <Text className="mx-auto mt-28 font-bold text-9xl leading-normal text-gray-dark">03</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
}
