import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from './consent.styles';
import type {
  OptionResponse,
  SurveyResponseQuestion,
} from '../../../types/types';
import { useAppTheme } from '../../../context/ThemeContext';

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

const Consent = ({ question, response, handleChange }: Props) => {
  const [consent, setConsent] = useState<boolean>(false);

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  useEffect(() => {
    if (
      !Array.isArray(response) &&
      response.reply &&
      response.reply.length > 0
    ) {
      setConsent(true);
    } else {
      setConsent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const handleCheckboxChange = (checked: boolean) => {
    setConsent(checked);
    const answer = checked ? question.options[0]?.option : '';
    if (answer !== undefined) {
      handleChange(question.id, answer, null, false);
    }
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
