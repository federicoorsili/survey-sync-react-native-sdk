import { useRef, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text, Animated } from 'react-native';

import { createStyles } from './likertScale.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  OptionResponse,
  QuestionDto,
  OptionResponseData,
} from '../../../types/types';

interface LikertScaleProps {
  question: QuestionDto;
  response: OptionResponse[] | null;
  handleChange: (response: OptionResponse[]) => void;
}

const LikertScale = ({
  question,
  handleChange,
  response,
}: LikertScaleProps) => {
  const selectedChoice = useMemo(() => {
    if (!response || response.length === 0 || !response[0]) return null;
    const maybeReply = parseInt(response[0].reply, 10);
    return Number.isNaN(maybeReply) ? null : maybeReply - 1;
  }, [response]);

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  // Initialize animated values
  const animatedValues = useRef(
    question.options.map(() => new Animated.Value(0))
  ).current;

  // Function to animate the options
  const animateOptions = (selectedIndex: number) => {
    animatedValues.forEach((value, index) => {
      Animated.timing(value, {
        toValue: index <= selectedIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    if (selectedChoice !== null) {
      animateOptions(selectedChoice);
    } else {
      // If no selection is found, set all to 0
      animateOptions(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChoice]);

  const handleOptionChange = (index: number, option: OptionResponseData) => {
    animateOptions(index);
    handleChange([{ optionId: option.id, reply: `${index + 1}` }]);
  };

  const renderOption = ({
    item: option,
    index,
  }: {
    item: OptionResponseData;
    index: number;
  }) => {
    const isSelected = selectedChoice !== null && index <= selectedChoice;

    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handleOptionChange(index, option)}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.circleContainer,
            isSelected && styles.selectedCircle,
            getAnimatedStyle(index),
          ]}
        >
          <Text
            style={[styles.circleText, isSelected && styles.selectedCircleText]}
          >
            {index + 1}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const getAnimatedStyle = (index: number) => {
    const scale = animatedValues[index]?.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1],
    });

    const opacity = animatedValues[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    return {
      transform: scale ? [{ scale }] : [],
      opacity: opacity ?? 1, // Provide a default value
    };
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={question.options}
        renderItem={renderOption}
        keyExtractor={(_, index) => `likert-${index}`}
        horizontal
        contentContainerStyle={styles.optionsContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default LikertScale;
