import { useFonts } from 'expo-font';
import { ThemeProvider } from './context/ThemeContext';
import SurveyWrapper from './components/SurveyView/SurveyWrapper';

interface AppProps {
  surveyAlias: string;
  onFinishedSurvey?: (respondentId: string) => void;
  theme?: 'light' | 'dark';
}

const Survey = ({ surveyAlias, onFinishedSurvey, theme }: AppProps) => {
  const [fontsLoaded] = useFonts({
    InterBold: require('./assets/fonts/Inter18pt-Bold.ttf'),
    InterMedium: require('./assets/fonts/Inter18pt-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter18pt-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider customTheme={theme}>
      <SurveyWrapper alias={surveyAlias} onFinishedSurvey={onFinishedSurvey} />
    </ThemeProvider>
  );
};

export default Survey;
