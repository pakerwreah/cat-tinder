import { CatsClientProvider, defaultCatsClient } from '@/lib/cats';
import { HomeScreen } from '@/screens';

export default function HomeRoute() {
  return (
    <CatsClientProvider client={defaultCatsClient}>
      <HomeScreen />
    </CatsClientProvider>
  );
}
