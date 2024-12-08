import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createStyles } from './time.styles';
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

const TimeComponent = ({ question, response, handleChange }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);
  const reply =
    (response && (!Array.isArray(response) ? response.reply : '')) || '';
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    reply ? new Date(`1970-01-01T${reply}`) : null
  );
  const [timeDisplay, setTimeDisplay] = useState<string>(
    reply ? reply.slice(0, 5) : '—:—'
  ); // Display HH:MM format
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const handleConfirm = (time: Date) => {
    setPickerVisible(false);
    setSelectedTime(time);

    // Format time as HH:MM for display
    const formattedTimeForDisplay = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTimeDisplay(formattedTimeForDisplay);

    const formattedTimeForSubmit = `${formattedTimeForDisplay}:00`;
    handleChange(question.id, formattedTimeForSubmit, null, false);
  };

  const hidePicker = () => setPickerVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.touchableArea}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>{timeDisplay}</Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        date={selectedTime || new Date()}
        is24Hour={true} // 24-hour format
      />
    </View>
  );
};

export default TimeComponent;
