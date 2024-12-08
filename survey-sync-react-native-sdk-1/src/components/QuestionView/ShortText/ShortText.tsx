import { View, TextInput } from 'react-native';
import { createStyles } from './shortText.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  SurveyResponseQuestion,
  OptionResponse,
} from '../../../types/types';

interface Props {
  question?: SurveyResponseQuestion;
  response?: OptionResponse | OptionResponse[];
  handleChange?: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
}

const ShortText = ({ handleChange, question, response }: Props) => {
  const currentResponse = !Array.isArray(response) ? response?.reply : '';

  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Answer goes here.."
        placeholderTextColor={theme.text.tertiary}
        value={currentResponse}
        onChangeText={(text) => {
          if (handleChange && question) {
            handleChange(question.id, text, null, true);
          }
        }}
        multiline
        numberOfLines={4}
        textAlignVertical="auto"
      />
    </View>
  );
};

export default ShortText;
