import { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Text, Animated } from 'react-native';

import { createStyles } from './likertScale.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  SurveyResponseQuestion,
  OptionResponse,
  OptionData,
} from '../../../types/types';

interface LikertScaleProps {
  question: SurveyResponseQuestion;
  handleLikertScaleChange: (
    questionId: number,
    reply: string,
    optionId: number
  ) => void;
  response: OptionResponse | OptionResponse[];
}

const LikertScale = ({
  question,
  handleLikertScaleChange,
  response,
}: LikertScaleProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  // Initialize animated values
  const animatedValues = useRef(
    question.options.map(() => new Animated.Value(0))
  ).current;

  // Animate options when response changes
  useEffect(() => {
    if (!Array.isArray(response) && response.reply !== '') {
      const index = parseInt(response.reply, 10);
      if (!isNaN(index)) {
        setSelectedChoice(index - 1);
        animateOptions(index - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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

  const handleOptionChange = (index: number, option: OptionData) => {
    setSelectedChoice(index);
    animateOptions(index);
    if (option?.id) {
      handleLikertScaleChange(question.id, option.option, option.id);
    }
  };

  const renderOption = ({
    item: option,
    index,
  }: {
    item: OptionData;
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
