import { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { createStyles } from './ratings.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import { useStarAnimation } from '../../../hooks/useStarAnimation';
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

const Ratings = ({
  question,
  handleLikertScaleChange,
  response,
}: LikertScaleProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const { animateStars, getAnimatedStyle } = useStarAnimation({
    totalStars: question.options.length,
  });

  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  useEffect(() => {
    if (!Array.isArray(response) && response.reply !== '') {
      const index = parseInt(response.reply, 10);
      if (!isNaN(index)) {
        setSelectedChoice(index - 1);
        animateStars(index - 1, null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOptionChange = (index: number, option: OptionData) => {
    setSelectedChoice(index);
    animateStars(index, selectedChoice);
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
    const shouldFill = selectedChoice !== null && index <= selectedChoice;

    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handleOptionChange(index, option)}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.starContainer, getAnimatedStyle(index)]}>
          <AntDesign
            name={shouldFill ? 'star' : 'staro'}
            size={42}
            color={shouldFill ? theme.text.primary : theme.text.secondary}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const displaySeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={question.options}
        renderItem={renderOption}
        keyExtractor={(_, index) => `likert-${index}`}
        horizontal
        contentContainerStyle={styles.optionsContainer}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={displaySeparator}
      />
    </View>
  );
};

export default Ratings;
