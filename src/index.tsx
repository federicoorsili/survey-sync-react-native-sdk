import { useFonts } from 'expo-font';
import { ThemeProvider } from './context/ThemeContext';
import SurveyWrapper from './components/SurveyView/SurveyWrapper';

interface AppProps {
  surveyAlias: string;
  onFinishedSurvey?: (respondentId: string) => void;
  theme?: 'light' | 'dark';
  fontFamily?: 'default' | 'poppins' | 'inter';
  searchParams?: Record<string, string | string[]>;
}

const Survey = ({
  surveyAlias,
  onFinishedSurvey,
  theme,
  fontFamily = 'default',
  searchParams,
}: AppProps) => {
  const [fontsLoaded] = useFonts({
    // Montserrat fonts (primary)
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    // Poppins fonts (alternative)
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    // Keep Inter fonts for backward compatibility
    InterBold: require('./assets/fonts/Inter18pt-Bold.ttf'),
    InterMedium: require('./assets/fonts/Inter18pt-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter18pt-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider customTheme={theme} initialFontFamily={fontFamily}>
      <SurveyWrapper
        alias={surveyAlias}
        onFinishedSurvey={onFinishedSurvey}
        searchParams={searchParams}
      />
    </ThemeProvider>
  );
};

export default Survey;
