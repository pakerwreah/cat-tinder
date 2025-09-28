import { setFavouritesQueryData, useFavouritesQuery } from '@/lib/cats/query/favourites';
import { View } from 'react-native';
import { useCallback, useRef } from 'react';
import { catsClient } from '@/lib/cats/client';
import { useFocusEffect } from 'expo-router';
import { FlashList, type FlashListRef } from '@shopify/flash-list';
import { FavouriteCell } from '@/components/FavouriteCell';
import { type Favourite } from '@/lib/cats/types';

export default function FavouritesScreen() {
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
    async (id: string) => {
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavouriteCell item={item} onRemove={onRemove} />}
      />
    </View>
  );
}
