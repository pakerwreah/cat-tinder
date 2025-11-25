import { queryOptions, useQuery } from '@tanstack/react-query';

import { type CatsClient, useCatsClient } from '@/lib/cats';

export function getCatImagesQueryKey() {
  return ['cat-images'] as const;
}

export function getCatImagesQuery(catsClient: CatsClient) {
  return queryOptions({
    queryKey: getCatImagesQueryKey(),
    queryFn: async () => {
      const [error, data] = await catsClient.getImages();
      if (error) {
        console.error('getCatImages', error);
        throw error;
      }
      return data ?? [];
    },
  });
}

export function useCatImagesQuery() {
  return useQuery(getCatImagesQuery(useCatsClient()));
}
