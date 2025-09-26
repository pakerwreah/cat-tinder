import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import { ReactNode, useEffect } from 'react';
import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans';

void SplashScreen.preventAutoHideAsync();

// only supported in dev build (standalone)
if (Constants.executionEnvironment === ExecutionEnvironment.Standalone) {
  SplashScreen.setOptions({
    duration: 500,
    fade: true,
  });
}

export function SplashManager({ children }: { children: ReactNode }) {
  const [loaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_500Medium,
    NunitoSans_700Bold,
  });

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
