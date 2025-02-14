import { View, TextInput } from 'react-native';
import { createStyles } from './shortText.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type { OptionResponse } from '../../../types/types';

interface Props {
  handleChange: (response: OptionResponse[]) => void;
  response: OptionResponse[] | null;
}

const ShortText = ({ handleChange, response }: Props) => {
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const currentReply =
    response && response.length > 0 ? response[0]?.reply : '';

  const handleInputChange = (text: string) => {
    handleChange([{ optionId: null, reply: text }]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Answer goes here.."
        placeholderTextColor={theme.text.tertiary}
        value={currentReply}
        onChangeText={handleInputChange}
        multiline
        numberOfLines={4}
        textAlignVertical="auto"
      />
    </View>
  );
};

export default ShortText;
