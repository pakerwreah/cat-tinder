import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { type CatImage } from '@/lib/cats/types';
import { CatImageCard } from '@/components/CatImageCard';
import { useCallback, useState } from 'react';

type Props = ViewProps & {
  images: CatImage[];
};

export function CatImageDeck({ className, images, ...props }: Props) {
  const [swiped, setSwiped] = useState<string[]>([]);
  const filtered = images.filter(({ id }) => !swiped.includes(id)).reverse();

  const onSwipe = useCallback((id: string) => {
    setSwiped((swiped) => swiped.concat(id));
  }, []);

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
