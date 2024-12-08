import { useRef } from 'react';
import { Animated } from 'react-native';

interface UseStarAnimationProps {
  totalStars: number;
  duration?: number;
  scaleRange?: [number, number, number];
  opacityRange?: [number, number];
}

export const useStarAnimation = ({
  totalStars,
  duration = 300,
  scaleRange = [1, 1.1, 1],
  opacityRange = [0.5, 1],
}: UseStarAnimationProps) => {
  const animatedValues = useRef(
    Array(totalStars)
      .fill(0)
      .map(() => new Animated.Value(0))
  ).current;

  const animateStars = (
    selectedIndex: number,
    previousIndex: number | null
  ) => {
    const prevIdx = previousIndex ?? -1;
    const animations: Animated.CompositeAnimation[] = [];

    animatedValues.forEach((value, index) => {
      if (index <= selectedIndex && index > prevIdx) {
        animations.push(
          Animated.timing(value, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          })
        );
      } else if (index > selectedIndex) {
        value.setValue(0);
      }
    });

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  };

  const getAnimatedStyle = (index: number) => {
    const animatedValue = animatedValues[index];
    if (!animatedValue) {
      return {};
    }

    const scale = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: scaleRange,
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: opacityRange,
    });

    return {
      transform: [{ scale }],
      opacity,
    };
  };

  return {
    animateStars,
    getAnimatedStyle,
  };
};
