import { useEffect, useMemo } from 'react';
import { View, TouchableOpacity, FlatList, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { createStyles } from './ratings.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import { useStarAnimation } from '../../../hooks/useStarAnimation';
import type {
  OptionResponse,
  QuestionDto,
  OptionResponseData,
} from '../../../types/types';

interface LikertScaleProps {
  question: QuestionDto;
  handleChange: (response: OptionResponse[]) => void;
  response: OptionResponse[] | null;
}

const Ratings = ({ question, handleChange, response }: LikertScaleProps) => {
  const selectedChoice = useMemo(() => {
    if (!response || response.length === 0 || !response[0]) return null;
    const maybeReply = parseInt(response[0].reply, 10);
    return Number.isNaN(maybeReply) ? null : maybeReply - 1;
  }, [response]);

  const { animateStars, getAnimatedStyle } = useStarAnimation({
    totalStars: question.options.length,
  });

  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  useEffect(() => {
    if (selectedChoice !== null && response && response[0]?.reply) {
      const extractValue = parseInt(response[0].reply, 10);
      if (!isNaN(extractValue)) {
        animateStars(extractValue - 1, null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChoice]);

  const handleOptionChange = (index: number, option: OptionResponseData) => {
    animateStars(index, selectedChoice);
    handleChange([{ optionId: option.id, reply: String(index + 1) }]);
  };

  const renderOption = ({
    item: option,
    index,
  }: {
    item: OptionResponseData;
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
