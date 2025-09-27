import { Image } from 'expo-image';
import { type ViewProps } from 'react-native';
import { type CatImage } from '@/lib/cats/types';

import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width / 2;

type Props = ViewProps & {
  image: CatImage;
  onSwipe(id: string, action: 'left' | 'right'): void;
};

export function CatImageCard({ image, onSwipe, ...props }: Props) {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      const shouldDismiss = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      if (shouldDismiss) {
        translateX.value = withTiming(
          (translateX.value > 0 ? width : -width) * 1.5,
          { duration: 200 },
          () => {
            runOnJS(onSwipe)(image.id, translateX.value > 0 ? 'right' : 'left');
          },
        );
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = (translateX.value / width) * 20; // max 20deg tilt
    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotate}deg` }],
    };
  });

  // TODO: show "NOPE" | "LIKE" stamp during gesture

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View {...props} style={animatedStyle}>
        <Image className="size-full overflow-hidden rounded-3xl bg-gray-400" source={image.url} />
      </Animated.View>
    </GestureDetector>
  );
}
