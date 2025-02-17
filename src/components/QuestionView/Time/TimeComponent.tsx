import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createStyles } from './time.styles';
import { useAppTheme } from '../../../context/ThemeContext';
import type { OptionResponse } from '../../../types/types';

interface Props {
  response: OptionResponse[] | null;
  handleChange: (response: OptionResponse[]) => void;
}

const TimeComponent = ({ response, handleChange }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const reply = response ? response[0]?.reply : null;

  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [timeDisplay, setTimeDisplay] = useState<string>('—:—');

  useEffect(() => {
    if (!reply) {
      setSelectedTime(null);
      setTimeDisplay('—:—');
      return;
    }

    const dateObj = new Date(reply);
    if (dateObj) {
      const hoursCurrent = dateObj.getHours();
      const minutesCurrent = dateObj.getMinutes();
      const hours = hoursCurrent.toString().padStart(2, '0');
      const minutes = minutesCurrent.toString().padStart(2, '0');

      const formattedTime = `${hours}:${minutes}`;
      setTimeDisplay(formattedTime);
      setSelectedTime(dateObj);
    }
  }, [reply]);

  const handleTimeChange = (time: Date) => {
    setPickerVisible(false);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    const formattedTimeForDisplay = `${hours}:${minutes}`;
    setTimeDisplay(formattedTimeForDisplay);
    setTimeDisplay(formattedTimeForDisplay);

    const answer = time.toISOString();
    handleChange([{ optionId: null, reply: answer }]);
  };

  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

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
        onConfirm={handleTimeChange}
        onCancel={hidePicker}
        date={selectedTime || new Date()}
        is24Hour={true}
      />
    </View>
  );
};

export default TimeComponent;
