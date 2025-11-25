import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

import { useFocusEffect } from 'expo-router';

import { FlashList, type FlashListRef } from '@shopify/flash-list';

import { useCatsClient } from '@/lib/cats';
import { setFavouritesQueryData, useFavouritesQuery } from '@/lib/cats/query/favourites';
import { type Favourite } from '@/lib/cats/types';

import { FavouritesCell } from './FavouritesCell';

export function FavouritesScreen() {
  const listRef = useRef<FlashListRef<Favourite>>(null);

  const catsClient = useCatsClient();

  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isFetching } = useFavouritesQuery();

  useFocusEffect(
    useCallback(() => {
      refetch().then(() => {
        setTimeout(() => {
          listRef.current?.scrollToTop();
        }, 100);
      });
    }, [refetch]),
  );

  const onPullToRefresh = useCallback(async () => {
    if (!isFetching) {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
  }, [isFetching, refetch]);

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
    [catsClient, data],
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
        refreshing={refreshing}
        onRefresh={onPullToRefresh}
      />
    </View>
  );
}
