import React from 'react';
import { Pressable } from 'react-native';

import { TabList, TabSlot, TabTrigger, type TabTriggerSlotProps, Tabs } from 'expo-router/ui';

import { type SvgProps } from 'react-native-svg';

import ChatIcon from '@/assets/icons/message.svg';
import PawIcon from '@/assets/icons/paw.svg';
import ProfileIcon from '@/assets/icons/user.svg';

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList className="absolute bottom-8 self-center rounded-full bg-white px-3 shadow-drop">
        <TabTrigger name="home" href="/" asChild>
          <TabButton Icon={PawIcon} />
        </TabTrigger>
        <TabTrigger name="chat" href="/chat" asChild>
          <TabButton Icon={ChatIcon} />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile" asChild>
          <TabButton Icon={ProfileIcon} />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & { Icon: React.FC<SvgProps> };

function TabButton({ Icon, isFocused, ...props }: TabButtonProps) {
  return (
    <Pressable {...props}>
      <Icon className="m-3 size-6" color={isFocused ? '#EC537E' : '#434141'} />
    </Pressable>
  );
}
