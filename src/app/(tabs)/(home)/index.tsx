import { View, Pressable, type PressableProps, ActivityIndicator, Button } from 'react-native';
import XIcon from '@/assets/icons/x.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import { useCatImagesQuery } from '@/lib/cats/query/images';
import { useCallback, useRef } from 'react';
import { CatImageDeck, type CatImageDeckRef } from '@/components/CatImageDeck';
import { catsClient } from '@/lib/cats/client';

export default function Index() {
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
        <ActionButton onPress={swipeLeft}>
          <XIcon className="size-full color-[#E16359]" />
        </ActionButton>
        <ActionButton onPress={swipeRight}>
          <HeartIcon className="size-full color-[#6BD88E]" />
        </ActionButton>
      </View>
    </View>
  );
}

function ActionButton(props: PressableProps) {
  return (
    <Pressable
      className="size-14 rounded-full bg-white p-2.5 shadow-drop active:bg-gray-200"
      {...props}
    />
  );
}
