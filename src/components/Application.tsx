import '@/theme/css-interop';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

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
