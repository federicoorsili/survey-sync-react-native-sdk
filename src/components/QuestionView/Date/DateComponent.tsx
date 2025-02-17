import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createStyles } from './date.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type { OptionResponse, QuestionDto } from '../../../types/types';
import {
  convertToDDMMYYYYFromIOS,
  formatToDDMMYYYY,
} from '../../../utils/utils';

interface Props {
  response: OptionResponse[] | null;
  question: QuestionDto;
  handleChange: (response: OptionResponse[]) => void;
}

const DateComponent = ({ response, handleChange }: Props) => {
  const reply = response && response[0]?.reply ? response[0]?.reply : '';

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const [inputValue, setInputValue] = useState<string>('');
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const handleConfirm = (selectedDate: Date) => {
    setPickerVisible(false);

    const formattedDate = formatToDDMMYYYY(selectedDate);
    setInputValue(formattedDate);
    const dateIOSString = selectedDate.toISOString();
    handleChange([{ optionId: null, reply: dateIOSString }]);
  };

  useEffect(() => {
    if (!reply) {
      setInputValue('');
      return;
    }
    const dateString = convertToDDMMYYYYFromIOS(reply);
    setInputValue(dateString);
  }, [reply]);

  const hidePicker = () => setPickerVisible(false);
  const dateObject = reply ? new Date(reply) : new Date();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.touchableArea}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>{inputValue || 'DD/MM/YYYY'}</Text>
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        date={dateObject}
      />
    </View>
  );
};

export default DateComponent;
