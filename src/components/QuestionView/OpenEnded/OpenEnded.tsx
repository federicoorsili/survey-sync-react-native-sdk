import { useAppTheme } from '../../../context/ThemeContext';
import type { OptionResponse } from '../../../types/types';
import { createStyles } from './openEnded.styles';
import { View, TextInput } from 'react-native';

interface OpenEndedProps {
  response: OptionResponse[] | null;
  handleChange: (response: OptionResponse[]) => void;
}

const OpenEnded = ({ response, handleChange }: OpenEndedProps) => {
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
        style={styles.textInput}
        placeholder="Type here"
        placeholderTextColor={theme.text.tertiary}
        multiline={true}
        value={currentReply}
        onChangeText={(text) => handleInputChange(text)}
      />
    </View>
  );
};

export default OpenEnded;
