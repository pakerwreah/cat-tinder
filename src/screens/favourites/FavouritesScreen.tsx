import { useCallback, useRef } from 'react';
import { View } from 'react-native';

import { useFocusEffect } from 'expo-router';

import { FlashList, type FlashListRef } from '@shopify/flash-list';

import { catsClient } from '@/lib/cats';
import { setFavouritesQueryData, useFavouritesQuery } from '@/lib/cats/query/favourites';
import { type Favourite } from '@/lib/cats/types';

import { FavouritesCell } from './FavouritesCell';

export function FavouritesScreen() {
  const listRef = useRef<FlashListRef<Favourite>>(null);

  const { data, refetch } = useFavouritesQuery();

  useFocusEffect(
    useCallback(() => {
      refetch().then(() => {
        setTimeout(() => {
          listRef.current?.scrollToTop();
        }, 100);
      });
    }, [refetch]),
  );

  const onRemove = useCallback(
    async (id: number) => {
      if (data) {
        setFavouritesQueryData(data.filter((item) => item.id !== id));
      }
      const [error] = await catsClient.deleteFavourite(id);
      if (error) {
        console.error(error);
      }
    },
    [data],
  );

  return (
    <View className="flex-1">
      <FlashList
        ref={listRef}
        data={data}
        numColumns={2}
        contentContainerClassName="m-1 pb-32"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FavouritesCell item={item} onRemove={onRemove} />}
      />
    </View>
  );
}
