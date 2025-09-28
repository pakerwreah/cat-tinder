import { View, Pressable, type PressableProps, ActivityIndicator, Button } from 'react-native';
import XIcon from '@/assets/icons/x.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import { useCatImagesQuery } from '@/lib/cats/query/images';
import { useCallback } from 'react';
import { CatImageDeck } from '@/components/CatImageDeck';

export default function Index() {
  const query = useCatImagesQuery();

  const refetch = useCallback(() => query.refetch(), [query]);

  return (
    <View className="flex flex-1 items-center justify-center gap-16">
      <View className="aspect-[0.8] w-full items-center justify-center">
        {query.isFetching ? (
          <ActivityIndicator color="black" />
        ) : query.isError ? (
          <Button title="Retry" onPress={refetch} />
        ) : (
          <CatImageDeck images={query.data ?? []} fetchMore={refetch} />
        )}
      </View>
      <View className="flex-row gap-12">
        <ActionButton>
          <XIcon className="size-full color-[#E16359]" />
        </ActionButton>
        <ActionButton>
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
