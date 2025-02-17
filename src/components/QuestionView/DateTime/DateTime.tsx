import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createStyles } from './dateTime.styles';
import type { OptionResponse, QuestionDto } from '../../../types/types';
import { useAppTheme } from '../../../context/ThemeContext';
import { convertToDDMMYYYYFromIOS } from '../../../utils/utils';

interface Props {
  question: QuestionDto;
  response: OptionResponse[] | null;
  handleChange: (response: OptionResponse[]) => void;
}

const DateTime = ({ response, handleChange }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [timeDisplay, setTimeDisplay] = useState<string>('—:—');

  const hideDatePicker = () => setDatePickerVisible(false);

  const hideTimePicker = () => setTimePickerVisible(false);

  const [dateTime, setDateTime] = useState<string | null>(null);

  const handleDateTimeChange = (answer: string) => {
    handleChange([{ optionId: null, reply: answer }]);
  };

  useEffect(() => {
    if (!response) {
      setDateTime(null);
      setTimeDisplay('—:—');
      return;
    }

    const reply = response[0]?.reply;

    if (!reply) {
      setDateTime(null);
      setTimeDisplay('—:—');
      return;
    }

    if (reply) {
      setDateTime(reply);
      const dateObj = new Date(reply);
      const hoursCurrent = dateObj.getHours();
      const minutesCurrent = dateObj.getMinutes();
      const formattedTime = `${String(hoursCurrent).padStart(2, '0')}:${String(minutesCurrent).padStart(2, '0')}`;
      setTimeDisplay(formattedTime);
    }
  }, [response]);

  const handleTimeChange = (time: Date) => {
    if (!time) return;
    hideDatePicker();
    hideTimePicker();

    if (dateTime) {
      const currentDate = new Date(dateTime);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      currentDate.setHours(hours, minutes, seconds, 0);
      handleDateTimeChange(currentDate.toISOString());
      // setDateTime(currentDate.toISOString());
    } else {
      const currentDate = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      currentDate.setHours(hours, minutes, seconds, 0);

      handleDateTimeChange(currentDate.toISOString());
      // setDateTime(currentDate.toISOString());
    }
  };

  const handleDateChange = (date: Date) => {
    if (!date) return;
    hideDatePicker();
    hideTimePicker();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let hours, minutes, seconds;

    if (dateTime) {
      // Extract time from the existing dateTime
      const currentDate = new Date(dateTime);
      hours = currentDate.getHours();
      minutes = currentDate.getMinutes();
      seconds = currentDate.getSeconds();
    } else {
      // Use the current time
      const currentDate = new Date();
      hours = currentDate.getHours();
      minutes = currentDate.getMinutes();
      seconds = currentDate.getSeconds();
    }

    // Construct the new Date with preserved time
    const newDate = new Date(year, month - 1, day, hours, minutes, seconds, 0);

    // Update state and notify the handler
    handleDateTimeChange(newDate.toISOString());
    // setDateTime(newDate.toISOString());
  };

  const dateReply = dateTime ? convertToDDMMYYYYFromIOS(dateTime) : '';
  const dateTimeObject = dateTime ? new Date(dateTime) : new Date();

  return (
    <View style={styles.container}>
      {/* Date Input */}
      <TouchableOpacity
        onPress={() => setDatePickerVisible(true)}
        style={styles.touchableArea}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>{dateReply || 'DD/MM/YYYY'}</Text>
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
        onConfirm={handleDateChange}
        onCancel={hideDatePicker}
        date={dateTimeObject || new Date()}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeChange}
        onCancel={hideTimePicker}
        date={dateTimeObject || new Date()}
        is24Hour={true}
      />
    </View>
  );
};

export default DateTime;
