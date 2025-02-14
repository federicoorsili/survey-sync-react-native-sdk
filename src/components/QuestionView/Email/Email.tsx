import { TextInput, View } from 'react-native';
import { createStyles } from './email.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type { OptionResponse, QuestionDto } from '../../../types/types';
interface Props {
  question: QuestionDto;
  response: OptionResponse[] | null;
  handleChange: (response: OptionResponse[]) => void;
}

const Email = ({ response, handleChange }: Props) => {
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const currentEmail =
    response && response.length > 0 ? response[0]?.reply : '';

  const handleInputChange = (text: string) => {
    handleChange([{ optionId: null, reply: text }]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="john.doe@company.com"
        placeholderTextColor={theme.text.tertiary}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={currentEmail}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

export default Email;
