import { useCallback, useRef } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';

import HeartIcon from '@/assets/icons/heart.svg';
import XIcon from '@/assets/icons/x.svg';
import { catsClient } from '@/lib/cats';
import { useCatImagesQuery } from '@/lib/cats/query/images';

import { CatImageDeck, type CatImageDeckRef } from './CatImageDeck';
import { SwipeButton } from './SwipeButton';

export function HomeScreen() {
  const deckRef = useRef<CatImageDeckRef>(null);

  const swipeLeft = useCallback(() => deckRef.current?.swipeTop('left'), []);
  const swipeRight = useCallback(() => deckRef.current?.swipeTop('right'), []);

  const { isFetching, isError, data, refetch: refetchQuery } = useCatImagesQuery();

  const refetch = useCallback(() => refetchQuery(), [refetchQuery]);

  const onSwipe = useCallback(async (imageId: string, action: 'left' | 'right') => {
    if (action === 'left') {
      return;
    }
    const [error] = await catsClient.addFavourite(imageId);

    if (error) {
      console.error(error);
    }
  }, []);

  return (
    <View className="flex-1 items-center py-8 mb-safe">
      <View className="aspect-[0.8] w-full items-center justify-center">
        {isFetching ? (
          <ActivityIndicator color="black" />
        ) : isError ? (
          <Button title="Retry" onPress={refetch} />
        ) : (
          <CatImageDeck ref={deckRef} images={data ?? []} fetchMore={refetch} onSwipe={onSwipe} />
        )}
      </View>
      <View className="flex-1 flex-row items-center gap-12">
        <SwipeButton onPress={swipeLeft}>
          <XIcon className="size-10 color-[#E16359]" />
        </SwipeButton>
        <SwipeButton onPress={swipeRight}>
          <HeartIcon className="size-8 color-[#6BD88E]" />
        </SwipeButton>
      </View>
    </View>
  );
}
