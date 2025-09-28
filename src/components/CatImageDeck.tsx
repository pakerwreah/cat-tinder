import { type Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, type ViewProps } from 'react-native';

import { twMerge } from 'tailwind-merge';

import { CatImageCard, type CatImageCardRef } from '@/components/CatImageCard';
import { type CatImage } from '@/lib/cats/types';

export type CatImageDeckRef = {
  swipeTop: CatImageCardRef['swipe'];
};

type Props = ViewProps & {
  ref?: Ref<CatImageDeckRef>;
  images: CatImage[];
  fetchMore(): void;
  onSwipe(id: string, action: 'left' | 'right'): void;
};

export function CatImageDeck({ ref, className, images, fetchMore, onSwipe, ...props }: Props) {
  const topCardRef = useRef<CatImageCardRef>(null);

  useImperativeHandle(ref, () => ({
    swipeTop(action) {
      topCardRef.current?.swipe(action);
    },
  }));

  const [swiped, setSwiped] = useState<string[]>([]);
  const filtered = images.filter(({ id }) => !swiped.includes(id)).reverse();

  const onCardSwipe = useCallback(
    (id: string, action: 'left' | 'right') => {
      setSwiped((swiped) => swiped.concat(id));
      onSwipe(id, action);
    },
    [onSwipe],
  );

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
          onSwipe={onCardSwipe}
        />
      ))}
    </View>
  );
}
