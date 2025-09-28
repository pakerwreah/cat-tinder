import { Tabs, TabList, TabTrigger, TabSlot, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable } from 'react-native';
import { type SvgProps } from 'react-native-svg';
import React, { useEffect } from 'react';
import FlameIcon from '@/assets/icons/flame.svg';
import StarIcon from '@/assets/icons/star.svg';
import { twMerge } from 'tailwind-merge';
import { queryClient } from '@/lib/query/client';
import { getFavouritesQuery } from '@/lib/cats/query/favourites';

export default function TabLayout() {
  useEffect(() => {
    void queryClient.prefetchQuery(getFavouritesQuery());
  }, []);

  return (
    <Tabs className="gap-2 mt-safe">
      <TabList className="mt-2 self-center rounded-full bg-gray-300 p-0.5 shadow-drop">
        <TabTrigger name="index" href="/" asChild>
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
