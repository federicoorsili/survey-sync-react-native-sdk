import { useEffect, useState } from 'react';
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

const MultipleChoice = ({
  question,
  handleChange,
  response,
}: SingleQuestionReplyProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  useEffect(() => {
    if (Array.isArray(response)) {
      const currentResponse = response
        .map((r) => r.optionId)
        .filter((id): id is number => id !== null);
      setSelected(currentResponse);
    }
  }, [response]);

  const handlePress = (item: OptionResponseData) => {
    // Handle multiple selection
    const isAlreadySelected = selected.includes(item.id);
    const updatedSelected = isAlreadySelected
      ? selected.filter((id) => id !== item.id)
      : [...selected, item.id];

    setSelected(updatedSelected);
    handleChange(question.id, item.option, item.id, !isAlreadySelected);
  };

  const renderOption: ListRenderItem<OptionResponseData> = ({ item }) => {
    const isSelected = selected.includes(item.id);

    // Conditional rendering for image options
    if (item.imageUrl) {
      return (
        <TouchableOpacity
          onPress={() => handlePress(item)}
          activeOpacity={1} // Prevents the default opacity effect
        >
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

export default MultipleChoice;
