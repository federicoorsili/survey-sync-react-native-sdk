import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from './yesNo.styles';
import type {
  OptionResponse,
  SurveyResponseQuestion,
} from '../../../types/types';
import { useAppTheme } from '../../../context/ThemeContext';

interface Props {
  question: SurveyResponseQuestion;
  response: OptionResponse | OptionResponse[];
  handleChange: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
}

const ResponseYesNo = ({ handleChange, question, response }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const [selected, setSelected] = useState(
    !Array.isArray(response) && response.reply ? response.reply : ''
  );

  const handleSelected = (choice: string) => {
    if (!question.options || question.options.length < 2) {
      console.error('Invalid question options');
      return;
    }

    if (choice === 'Yes') {
      setSelected('Yes');
      handleChange(
        question.id,
        question.options[0]?.option || '',
        question.options[0]?.id || null,
        false
      );
    } else if (choice === 'No') {
      setSelected('No');
      handleChange(
        question.id,
        question.options[1]?.option || '',
        question.options[1]?.id || null,
        false
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, selected === 'Yes' && styles.selectedYes]}
        onPress={() => handleSelected('Yes')}
      >
        <Text
          style={[
            styles.optionText,
            selected === 'Yes' && styles.selectedYesText,
          ]}
        >
          Yes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, selected === 'No' && styles.selectedNo]}
        onPress={() => handleSelected('No')}
      >
        <Text
          style={[
            styles.optionText,
            selected === 'No' && styles.selectedNoText,
          ]}
        >
          No
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResponseYesNo;
