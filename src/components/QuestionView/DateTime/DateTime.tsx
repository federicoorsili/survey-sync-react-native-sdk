import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createStyles } from './dateTime.styles';
import type {
  OptionResponse,
  SurveyResponseQuestion,
} from '../../../types/types';
import { useAppTheme } from '../../../context/ThemeContext';
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

const DateTime = ({ question, response, handleChange }: Props) => {
  // Extract the reply string
  const reply =
    (response && (!Array.isArray(response) ? response.reply : '')) || '';

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  // Parse the initial reply into date and time
  let initialDate: Date | null = null;
  let initialTime: Date | null = null;

  if (reply) {
    // reply format: "DD/MM/YYYY HH:mm:ss"
    const [datePart, timePart] = reply.split(' ');
    if (datePart) {
      const [dd, mm, yyyy] = datePart.split('/').map(Number);
      if (dd && mm && yyyy) {
        initialDate = new Date(yyyy, mm - 1, dd); // Local date
      }
    }
    if (timePart) {
      const [HH, MM, SS] = timePart.split(':').map(Number);
      initialTime = new Date(1970, 0, 1, HH, MM, SS); // Local time reference date
    }
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedTime, setSelectedTime] = useState<Date | null>(initialTime);

  const [dateDisplay, setDateDisplay] = useState<string>(
    selectedDate ? formatToDDMMYYYY(selectedDate) : 'DD/MM/YYYY'
  );

  const [timeDisplay, setTimeDisplay] = useState<string>(
    selectedTime
      ? selectedTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—:—'
  );

  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  // Combine selected date and time into the desired string format "DD/MM/YYYY HH:mm:ss"
  const updateCombinedDateTime = (date: Date | null, time: Date | null) => {
    const datePart = date ? formatToDDMMYYYY(date) : 'DD/MM/YYYY';
    const timePart = time
      ? time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : '00:00:00';

    if (!date && !time) return; // No updates if we have neither

    const finalDatePart = datePart !== 'DD/MM/YYYY' ? datePart : '04/11/2024';
    const finalTimePart = time ? timePart : '00:00:00';

    const combinedDateTime = `${finalDatePart} ${finalTimePart}`;
    handleChange(question.id, combinedDateTime, null, false);
  };

  // Date Picker Handlers
  const handleDateConfirm = (date: Date) => {
    setDatePickerVisible(false);
    setSelectedDate(date);

    const formattedDate = formatToDDMMYYYY(date);
    setDateDisplay(formattedDate);

    updateCombinedDateTime(date, selectedTime);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  // Time Picker Handlers
  const handleTimeConfirm = (time: Date) => {
    setTimePickerVisible(false);
    setSelectedTime(time);

    const formattedTimeForDisplay = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTimeDisplay(formattedTimeForDisplay);

    updateCombinedDateTime(selectedDate, time);
  };

  const hideTimePicker = () => setTimePickerVisible(false);

  return (
    <View style={styles.container}>
      {/* Date Input */}
      <TouchableOpacity
        onPress={() => setDatePickerVisible(true)}
        style={styles.touchableArea}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>{dateDisplay}</Text>
        </View>
      </TouchableOpacity>

      {/* Time Input */}
      <TouchableOpacity
        onPress={() => setTimePickerVisible(true)}
        style={[styles.touchableArea, styles.timeTouchableArea]}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>{timeDisplay}</Text>
        </View>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={selectedDate || new Date()}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        date={selectedTime || new Date()}
        is24Hour={true}
      />
    </View>
  );
};

export default DateTime;
