import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from 'react-native';
import { createStyles } from './singleMultipleChoice.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  SurveyResponseQuestion,
  OptionResponse,
  OptionResponseData,
} from '../../../types/types';

interface SingleQuestionReplyProps {
  question: SurveyResponseQuestion;
  handleChange: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
  response: OptionResponse | OptionResponse[];
}

const SingleChoice = ({
  question,
  handleChange,
  response,
}: SingleQuestionReplyProps) => {
  const currentResponse =
    !Array.isArray(response) && response ? response.optionId : null;

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const [selectedOptionId, setSelectedOptionId] = React.useState<number | null>(
    currentResponse
  );

  const handlePress = (item: OptionResponseData) => {
    setSelectedOptionId(item.id);
    handleChange(question.id, item.option, item.id, true);
  };

  const renderOption: ListRenderItem<OptionResponseData> = ({ item }) => {
    const isSelected = item.id === selectedOptionId;

    // Conditional rendering for image options
    if (item.imageUrl) {
      return (
        <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={1}>
          <View
            style={[
              styles.imageOptionContainer,
              isSelected && styles.imageOptionContainerSelected,
            ]}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            {item.option && (
              <Text style={styles.optionImageText}>{item.option}</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    }

    // Render text-only options
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={[[styles.option, isSelected && styles.selectedOption]]}>
          <Text
            style={[styles.optionText, isSelected && styles.selectedOptionText]}
          >
            {item.option}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        style={styles.optionsContainer}
        data={question.options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.optionsList}
      />
    </View>
  );
};

export default SingleChoice;
