import '@/theme/css-interop';

import { Stack } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function Application() {
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FBFAFF' },
        }}
      />
    </GestureHandlerRootView>
  );
}
