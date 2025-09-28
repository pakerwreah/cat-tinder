import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { type CatImage } from '@/lib/cats/types';
import { CatImageCard } from '@/components/CatImageCard';
import { useCallback, useEffect, useState } from 'react';

type Props = ViewProps & {
  images: CatImage[];
  fetchMore(): void;
};

export function CatImageDeck({ className, images, fetchMore, ...props }: Props) {
  const [swiped, setSwiped] = useState<string[]>([]);
  const filtered = images.filter(({ id }) => !swiped.includes(id)).reverse();

  const onSwipe = useCallback((id: string) => {
    setSwiped((swiped) => swiped.concat(id));
  }, []);

  useEffect(() => {
    if (filtered.length === 0) {
      fetchMore();
    }
  }, [filtered.length, fetchMore]);

  return (
    <View className={twMerge('size-full shadow-drop', className)} {...props}>
      {filtered.map((image, i, { length }) => (
        <CatImageCard
          className={twMerge('absolute inset-4', i < length - 2 && 'invisible')}
          key={image.id}
          image={image}
          onSwipe={onSwipe}
        />
      ))}
    </View>
  );
}
