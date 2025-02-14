import { View, Text } from 'react-native';
import { createStyles } from './questionCounter.styles';
import { useAppTheme } from '../../context/ThemeContext';

interface Props {
  currentQuestionIndex: number;
  questionsSize: number;
}

const QuestionCounter = ({ currentQuestionIndex, questionsSize }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentQuestionIndex + 1} / {questionsSize}
      </Text>
    </View>
  );
};

export default QuestionCounter;
