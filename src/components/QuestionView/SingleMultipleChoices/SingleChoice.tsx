import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from 'react-native';
import { createStyles } from './singleMultipleChoice.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  OptionResponse,
  OptionResponseData,
  QuestionDto,
} from '../../../types/types';

interface SingleQuestionReplyProps {
  question: QuestionDto;
  handleChange: (response: OptionResponse[]) => void;
  response: OptionResponse[] | null;
}

const SingleChoice = ({
  question,
  handleChange,
  response,
}: SingleQuestionReplyProps) => {
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const [input, setInput] = useState('');

  const selectedChoice = useMemo(() => {
    if (response && response.length > 0) {
      return response[0];
    }
    return null;
  }, [response]);

  const handleSingleChoiceChange = (option: OptionResponseData) => {
    const newResponse = { optionId: option.id, reply: option.option };
    handleChange([newResponse]);
  };

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const handleInputBlur = () => {
    handleChange([{ optionId: null, reply: input }]);
    setInput('');
  };

  const handleInputFocus = () => {
    handleChange([]);
  };

  const renderOption: ListRenderItem<OptionResponseData> = ({ item }) => {
    const isSelected = item.id === selectedChoice?.optionId;

    // Conditional rendering for image options
    if (item.imageUrl) {
      return (
        <TouchableOpacity
          onPress={() => handleSingleChoiceChange(item)}
          activeOpacity={1}
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
      <TouchableOpacity onPress={() => handleSingleChoiceChange(item)}>
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
        onFocus={handleInputFocus}
      />
    </View>
  );
};

export default SingleChoice;
