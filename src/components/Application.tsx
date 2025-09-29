import '@/theme/css-interop';

import { Stack } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useUserStore } from '@/lib/user/store';

export function Application() {
  const isLoggedIn = useUserStore((store) => !!store.userId);

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FBFAFF' },
        }}
      >
        <Stack.Screen name="index" redirect />

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)/login" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  );
}
