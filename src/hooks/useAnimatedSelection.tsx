import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

/**
 * Custom hook for managing animated transitions for single or multiple selections.
 * @param {number} length - Number of items to animate.
 * @param {"single" | "multiple"} mode - Selection mode (single or multiple).
 * @param {number} duration - Duration of the animation (in ms).
 * @returns {Object} - Animated values and a handler to toggle animations.
 */
const useAnimatedSelection = (
  length: number,
  mode: 'single' | 'multiple' = 'single',
  duration = 200
) => {
  // Create animated values for each item
  const animationValues = useRef<Animated.Value[]>(
    Array.from({ length }, () => new Animated.Value(0))
  ).current;

  // Keep track of ongoing animations
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Function to handle selection
  const handleSelection = useCallback(
    (index: number, isSelected: boolean) => {
      // Stop any ongoing animations
      if (animationRef.current) {
        animationRef.current.stop();
      }

      if (mode === 'single') {
        // Create an array of animations for all items
        const animations = animationValues.map((value, idx) =>
          Animated.timing(value, {
            toValue: idx === index ? 1 : 0,
            duration,
            useNativeDriver: false,
          })
        );

        // Run all animations in parallel to ensure synchronization
        animationRef.current = Animated.parallel(animations);
        animationRef.current.start(() => {
          animationRef.current = null;
        });
      } else {
        // In multiple mode, animate only the selected item
        const animatedValue = animationValues[index];
        if (animatedValue) {
          animationRef.current = Animated.timing(animatedValue, {
            toValue: isSelected ? 1 : 0,
            duration,
            useNativeDriver: false,
          });

          animationRef.current.start(() => {
            animationRef.current = null;
          });
        }

        if (animationRef.current) {
          animationRef.current.start(() => {
            animationRef.current = null;
          });
        }
      }
    },
    [animationValues, duration, mode]
  );

  // Cleanup function to stop animations when component unmounts
  const cleanup = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  }, []);

  return {
    animationValues,
    handleSelection,
    cleanup,
  };
};

export default useAnimatedSelection;
