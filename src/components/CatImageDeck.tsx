import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { type CatImage } from '@/lib/cats/types';
import { CatImageCard, type CatImageCardRef } from '@/components/CatImageCard';
import { type Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

export type CatImageDeckRef = {
  swipeTop: CatImageCardRef['swipe'];
};

type Props = ViewProps & {
  ref?: Ref<CatImageDeckRef>;
  images: CatImage[];
  fetchMore(): void;
};

export function CatImageDeck({ ref, className, images, fetchMore, ...props }: Props) {
  const topCardRef = useRef<CatImageCardRef>(null);

  useImperativeHandle(ref, () => ({
    swipeTop(action) {
      topCardRef.current?.swipe(action);
    },
  }));

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
          ref={i === length - 1 ? topCardRef : undefined}
          className={twMerge('absolute inset-4', i < length - 2 && 'invisible')}
          key={image.id}
          image={image}
          onSwipe={onSwipe}
        />
      ))}
    </View>
  );
}
