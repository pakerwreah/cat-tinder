import { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { Image } from 'expo-image';

import XIcon from '@/assets/icons/x.svg';
import type { Favourite } from '@/lib/cats/types';

type Props = {
  item: Favourite;
  onRemove(id: number): void;
};

export const FavouritesCell = memo(function FavouritesCell({ item, onRemove }: Props) {
  const removeTap = useCallback(() => onRemove(item.id), [item.id, onRemove]);

  return (
    <View className="my-0.5 aspect-square flex-1 overflow-hidden rounded-lg">
      <Image className="size-full" source={item.image.url} />
      <Pressable
        className="absolute right-2 top-2 size-6 rounded-full bg-white/75 p-0.5 active:opacity-50"
        onPress={removeTap}
      >
        <XIcon className="size-full color-[#E16359]" />
      </Pressable>
    </View>
  );
});
