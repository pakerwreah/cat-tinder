import { type ReactNode, useEffect } from 'react';

import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans';

import { useUserStore } from '@/lib/user/store';

void SplashScreen.preventAutoHideAsync();

// only supported in dev build (standalone)
if (Constants.executionEnvironment === ExecutionEnvironment.Standalone) {
  SplashScreen.setOptions({
    duration: 500,
    fade: true,
  });
}

export function SplashManager({ children }: { children: ReactNode }) {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_500Medium,
    NunitoSans_700Bold,
  });

  const userHydrated = useUserStore((store) => store._hydrated);

  const loaded = fontsLoaded && userHydrated;

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return children;
}
