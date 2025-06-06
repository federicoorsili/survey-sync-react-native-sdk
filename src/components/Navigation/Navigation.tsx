import { createStyles } from './navigation.styles';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAppTheme } from '../../context/ThemeContext';

interface Props {
  currentQuestionIndex: number;
  handleNavigation: (direction: number) => void;
  answerRequired: boolean;
  lastIndex: number;
}

const Navigation = ({
  currentQuestionIndex,
  handleNavigation,
  answerRequired,
  lastIndex,
}: Props) => {
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const showToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Answer Required',
      visibilityTime: 2000,
      text1Style: {
        color: theme.mainColor,
      },
      text2: 'Please answer the question before continuing.',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonPrev}
          onPress={() => handleNavigation(-1)}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.buttonText}>INDIETRO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonNext,
            answerRequired && styles.buttonNextDisabled,
          ]}
          onPress={() => {
            if (answerRequired) {
              showToast();
            } else {
              handleNavigation(1);
            }
          }}
        >
          <Text
            style={[
              styles.buttonText,
              answerRequired && styles.buttonTextDisabled,
            ]}
          >
            {currentQuestionIndex < lastIndex ? 'AVANTI' : 'INVIA'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navigation;
