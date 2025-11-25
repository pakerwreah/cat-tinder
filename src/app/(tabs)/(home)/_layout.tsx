import React, { useEffect } from 'react';
import { Pressable } from 'react-native';

import { TabList, TabSlot, TabTrigger, type TabTriggerSlotProps, Tabs } from 'expo-router/ui';

import { type SvgProps } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';

import FlameIcon from '@/assets/icons/flame.svg';
import StarIcon from '@/assets/icons/star.svg';
import { useCatsClient } from '@/lib/cats';
import { getFavouritesQuery } from '@/lib/cats/query/favourites';
import { queryClient } from '@/lib/query/client';

export default function TabLayout() {
  const catsClient = useCatsClient();

  useEffect(() => {
    void queryClient.prefetchQuery(getFavouritesQuery(catsClient));
  }, [catsClient]);

  return (
    <Tabs className="gap-2 mt-safe">
      <TabList className="mt-2 self-center rounded-full bg-gray-300 p-0.5 shadow-drop">
        <TabTrigger name="home" href="/home" asChild>
          <TabButton Icon={FlameIcon} color="#EC537E" />
        </TabTrigger>
        <TabTrigger name="favourites" href="/favourites" asChild>
          <TabButton Icon={StarIcon} color="gold" />
        </TabTrigger>
      </TabList>
      <TabSlot />
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & { Icon: React.FC<SvgProps>; color: string };

function TabButton({ Icon, isFocused, color, ...props }: TabButtonProps) {
  return (
    <Pressable className={twMerge('rounded-full', isFocused && 'bg-white')} {...props}>
      <Icon className="m-1 mx-3 size-4" color={isFocused ? color : '#434141'} />
    </Pressable>
  );
}
