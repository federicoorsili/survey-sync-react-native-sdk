import { TextInput, View } from 'react-native';
import { createStyles } from './email.styles';
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

const Email = ({ question, response, handleChange }: Props) => {
  const currentResponse = !Array.isArray(response) ? response?.reply : '';

  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="john.doe@company.com"
        placeholderTextColor={theme.text.tertiary}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
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

export default Email;
