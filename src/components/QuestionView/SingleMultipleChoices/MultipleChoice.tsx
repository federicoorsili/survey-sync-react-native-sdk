import { useEffect, useState } from 'react';
import { createStyles } from './singleMultipleChoice.styles';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from 'react-native';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  OptionResponse,
  QuestionDto,
  OptionResponseData,
} from '../../../types/types';

interface SingleQuestionReplyProps {
  question: QuestionDto;
  handleChange: (response: OptionResponse[]) => void;
  response: OptionResponse[] | null;
}

const MultipleChoice = ({
  question,
  handleChange,
  response,
}: SingleQuestionReplyProps) => {
  const selectedOptions = response || [];
  const [input, setInput] = useState('');

  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  useEffect(() => {
    if (!response) return;
    if (response && response.length > 0) {
      const findTextInput = response.find((res) => res.optionId === null);
      if (findTextInput) {
        setInput(findTextInput.reply);
      }
    }
  }, [response]);

  const handleMultipleChoiceChange = (option: OptionResponseData) => {
    const isSelected = selectedOptions.some(
      (res) => res.optionId === option.id
    );

    let newSelectedOptions: OptionResponse[];
    if (isSelected) {
      newSelectedOptions = selectedOptions.filter(
        (res) => res.optionId !== option.id
      );
    } else {
      newSelectedOptions = [
        ...selectedOptions,
        { optionId: option.id, reply: option.option },
      ];
    }

    handleChange(newSelectedOptions);
  };

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const handleInputBlur = () => {
    // If user typed something, sync it to the response array
    if (input.trim()) {
      if (response && response.length > 0) {
        const newSelectedOptions = [
          ...response,
          { optionId: null, reply: input },
        ];
        handleChange(newSelectedOptions);
      } else {
        handleChange([{ optionId: null, reply: input }]);
      }
      // Clear local input state if desired
      setInput('');
    }
  };
  const renderOption: ListRenderItem<OptionResponseData> = ({ item }) => {
    const isSelected = selectedOptions.some((res) => res.optionId === item.id);

    // Conditional rendering for image options
    if (item.imageUrl) {
      return (
        <TouchableOpacity
          onPress={() => handleMultipleChoiceChange(item)}
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
      <TouchableOpacity onPress={() => handleMultipleChoiceChange(item)}>
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
      <TextInput
        style={styles.textInput}
        placeholder="Type here"
        placeholderTextColor={theme.text.tertiary}
        multiline={true}
        value={input}
        onChangeText={handleInputChange}
        onBlur={handleInputBlur}
      />
    </View>
  );
};

export default MultipleChoice;
