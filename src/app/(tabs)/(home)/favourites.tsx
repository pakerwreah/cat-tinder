import { CatsClientProvider, defaultCatsClient } from '@/lib/cats';
import { FavouritesScreen } from '@/screens';

export default function FavouritesRoute() {
  return (
    <CatsClientProvider client={defaultCatsClient}>
      <FavouritesScreen />
    </CatsClientProvider>
  );
}
