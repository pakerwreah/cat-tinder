import { queryOptions, useQuery } from '@tanstack/react-query';

import { catsClient } from '@/lib/cats/client';
import { type Favourite } from '@/lib/cats/types';
import { queryClient } from '@/lib/query/client';

export function getFavouritesQueryKey() {
  return ['favourites'] as const;
}

export function getFavouritesQuery() {
  return queryOptions({
    queryKey: getFavouritesQueryKey(),
    queryFn: async () => {
      const [error, data] = await catsClient.getFavourites();
      if (error) {
        console.error('getFavourites', error);
        throw error;
      }
      return data ?? [];
    },
  });
}

export function useFavouritesQuery() {
  return useQuery(getFavouritesQuery());
}

export function setFavouritesQueryData(data: Favourite[]) {
  queryClient.setQueryData(getFavouritesQueryKey(), data);
}
