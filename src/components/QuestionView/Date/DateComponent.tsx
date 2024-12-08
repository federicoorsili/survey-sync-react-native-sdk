import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createStyles } from './date.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type {
  SurveyResponseQuestion,
  OptionResponse,
} from '../../../types/types';
import { formatToDDMMYYYY } from '../../../utils/utils';

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

const DateComponent = ({ question, response, handleChange }: Props) => {
  const reply = response && !Array.isArray(response) ? response.reply : '';

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  // Parse the `reply` string in `DD/MM/YYYY` format into a Date object
  let initialDate: Date | null = null;
  if (reply) {
    const [dd, mm, yyyy] = reply.split('/').map(Number);
    if (dd && mm && yyyy) {
      initialDate = new Date(yyyy, mm - 1, dd);
    }
  }

  const [displayDate, setDisplayDate] = useState<Date | null>(initialDate);
  const [inputValue, setInputValue] = useState<string>(
    displayDate ? formatToDDMMYYYY(displayDate) : ''
  );
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const handleConfirm = (selectedDate: Date) => {
    setPickerVisible(false);
    setDisplayDate(selectedDate);

    const formattedDate = formatToDDMMYYYY(selectedDate);
    setInputValue(formattedDate);
    handleChange(question.id, formattedDate, null, false);
  };

  const hidePicker = () => setPickerVisible(false);

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
        date={displayDate || new Date()}
      />
    </View>
  );
};

export default DateComponent;
