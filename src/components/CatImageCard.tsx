import { Image } from 'expo-image';
import { Text, type ViewProps } from 'react-native';
import { type CatImage } from '@/lib/cats/types';
import { useCallback } from 'react';
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
      const shouldSwipe = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      if (!shouldSwipe) {
        translateX.value = withSpring(0, { duration: 1000 });
        return;
      }
      translateX.value = withTiming(
        (translateX.value > 0 ? width : -width) * 1.5,
        { duration: 200 },
        () => {
          runOnJS(onSwipe)(image.id, translateX.value > 0 ? 'right' : 'left');
        },
      );
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    const rotate = (translateX.value / width) * 20; // max 20deg tilt
    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotate}deg` }],
    };
  });

  const getStampOpacity = useCallback((value: number, side: 'left' | 'right') => {
    'worklet';
    const leeway = 0.2; // this is to avoid showing the opposite stamp when springing back
    return ((side === 'left' ? -1 : 1) * value) / (width / 3) - leeway;
  }, []);

  const animatedNopeStyle = useAnimatedStyle(() => ({
    opacity: getStampOpacity(translateX.value, 'left'),
  }));

  const animatedLikeStyle = useAnimatedStyle(() => ({
    opacity: getStampOpacity(translateX.value, 'right'),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View {...props} style={animatedCardStyle}>
        <Image className="size-full overflow-hidden rounded-3xl bg-gray-400" source={image.url} />

        <Animated.View
          className="absolute left-8 top-16 rotate-[-20deg] rounded-lg border-4 border-green-500 px-4"
          style={animatedLikeStyle}
        >
          <Text className="text-center font-bold text-4xl leading-snug text-green-500">LIKE</Text>
        </Animated.View>

        <Animated.View
          className="absolute right-8 top-16 rotate-[20deg] rounded-lg border-4 border-red-500 px-3"
          style={animatedNopeStyle}
        >
          <Text className="text-center font-bold text-4xl leading-snug text-red-500">NOPE</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
