import { View, TextInput } from 'react-native';
import { createStyles } from './phone.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  SurveyResponseQuestion,
  OptionResponse,
} from '../../../types/types';

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

const Phone = ({ question, response, handleChange }: Props) => {
  const currentResponse = !Array.isArray(response) ? response?.reply : '';

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="+1 123 456 7890"
        placeholderTextColor={styles.placeholder.color}
        keyboardType="phone-pad"
        value={currentResponse}
        onChangeText={(text) => {
          if (handleChange && question) {
            handleChange(question.id, text, null, true);
          }
        }}
      />
    </View>
  );
};

export default Phone;
