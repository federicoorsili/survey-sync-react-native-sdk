import { useAppTheme } from '../../../context/ThemeContext';
import type {
  OptionResponse,
  SurveyResponseQuestion,
} from '../../../types/types';
import { createStyles } from './openEnded.styles';
import { View, TextInput, Text } from 'react-native';

interface OpenEndedProps {
  question: SurveyResponseQuestion;
  response: OptionResponse | OptionResponse[];
  handleChange: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
}

const OpenEnded = ({ question, response, handleChange }: OpenEndedProps) => {
  if (!question) return <Text>Question data is missing!</Text>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type here"
        placeholderTextColor={theme.text.tertiary}
        multiline={true}
        value={!Array.isArray(response) && response.reply ? response.reply : ''}
        onChangeText={(text) => handleChange(question.id, text, null, false)}
      />
    </View>
  );
};

export default OpenEnded;
