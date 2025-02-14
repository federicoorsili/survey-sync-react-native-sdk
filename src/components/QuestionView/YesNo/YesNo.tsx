import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from './yesNo.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  OptionResponse,
  OptionResponseData,
  QuestionDto,
} from '../../../types/types';

interface Props {
  question: QuestionDto;
  response: OptionResponse[] | null;
  handleChange: (response: OptionResponse[]) => void;
}

const ResponseYesNo = ({ question, response, handleChange }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const [selectedChoice, setSelectedChoice] = useState<OptionResponse | null>(
    response?.[0] ?? null
  );

  useEffect(() => {
    if (!response) return;
    if (response?.[0]) {
      setSelectedChoice(response[0]);
    }
  }, [response]);

  const handleChoiceChange = (option: OptionResponseData) => {
    const newResponse: OptionResponse = {
      optionId: option.id,
      reply: option.option,
    };
    setSelectedChoice(newResponse);
    handleChange([newResponse]);
  };

  return (
    <View style={styles.container}>
      {question.options.map((option) => {
        const isSelected = selectedChoice?.optionId === option.id;
        // Decide if "Yes" or "No" by checking the lowercased label
        const isYes = option.option.toLowerCase() === 'yes';

        // Container styles
        const containerStyles = [
          styles.optionContainer,
          isSelected &&
            (isYes ? styles.selectedYesContainer : styles.selectedNoContainer),
        ];

        // Text styles
        const textStyles = [
          styles.optionText,
          isSelected &&
            (isYes ? styles.selectedYesText : styles.selectedNoText),
        ];

        return (
          <TouchableOpacity
            key={option.id}
            style={containerStyles}
            onPress={() => handleChoiceChange(option)}
            activeOpacity={0.8}
          >
            <Text style={textStyles}>{option.option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ResponseYesNo;
