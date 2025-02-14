import { View, TextInput } from 'react-native';
import { createStyles } from './phone.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type { OptionResponse } from '../../../types/types';

interface Props {
  response: OptionResponse[] | null;
  handleChange: (response: OptionResponse[]) => void;
}

const Phone = ({ response, handleChange }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const currentNumber =
    response && response.length > 0 ? response[0]?.reply : '';

  const handleInputChange = (text: string) => {
    handleChange([{ optionId: null, reply: text }]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="+1 123 456 7890"
        placeholderTextColor={styles.placeholder.color}
        keyboardType="phone-pad"
        value={currentNumber}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

export default Phone;
