import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from './consent.styles';
import type { OptionResponse, QuestionDto } from '../../../types/types';
import { useAppTheme } from '../../../context/ThemeContext';

interface Props {
  question: QuestionDto;
  handleChange: (response: OptionResponse[]) => void;
  response: OptionResponse[] | null;
}

const Consent = ({ question, response, handleChange }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const reply = response?.[0]?.reply ?? '';
  const [consent, setConsent] = useState<boolean>(!!reply);

  useEffect(() => {
    setConsent(!!reply);
  }, [reply]);

  const handleCheckboxChange = (val: boolean) => {
    setConsent(val);
    const answer = val ? question.options[0]?.option || '' : '';

    const optionId = val ? (question.options[0]?.id ?? null) : null;
    handleChange([{ optionId, reply: answer }]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleCheckboxChange(!consent)}
        style={styles.touchable}
      >
        <View style={[styles.checkbox, consent && styles.checkboxChecked]}>
          {consent && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.text}>{question.options[0]?.option}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Consent;
