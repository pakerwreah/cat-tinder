import { ScrollView, type ScrollViewProps } from 'react-native';

import { twMerge } from 'tailwind-merge';

type Props = Omit<ScrollViewProps, 'contentInset'>;

export function FormScrollView({ contentContainerClassName, children, ...props }: Props) {
  return (
    <ScrollView
      contentContainerClassName={twMerge('flex-grow', contentContainerClassName)}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
      showsVerticalScrollIndicator={false}
      bounces={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
