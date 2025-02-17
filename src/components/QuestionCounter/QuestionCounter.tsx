import { View, Text } from 'react-native';
import { createStyles } from './questionCounter.styles';
import { useAppTheme } from '../../context/ThemeContext';

interface Props {
  currentQuestionIndex: number;
  questionsSize?: number;
}

const QuestionCounter = ({ currentQuestionIndex, questionsSize }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);
  const isQuestionSizeValid =
    typeof questionsSize === 'number' && questionsSize !== null;

  return (
    <View style={styles.container}>
      {isQuestionSizeValid ? (
        <Text style={styles.text}>
          {currentQuestionIndex + 1} / {questionsSize}
        </Text>
      ) : (
        <Text style={styles.text}>{currentQuestionIndex + 1}</Text>
      )}
    </View>
  );
};

export default QuestionCounter;
