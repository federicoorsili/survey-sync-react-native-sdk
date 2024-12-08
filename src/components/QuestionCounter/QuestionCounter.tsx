import { View, Text } from 'react-native';
import { createStyles } from './questionCounter.styles';
import { useAppTheme } from '../../context/ThemeContext';

interface Props {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionCounter = ({ currentQuestionIndex, totalQuestions }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentQuestionIndex + 1} / {totalQuestions}
      </Text>
    </View>
  );
};

export default QuestionCounter;
