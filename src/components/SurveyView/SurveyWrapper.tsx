/* eslint-disable react-native/no-inline-styles */
import { Platform, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAppTheme } from '../../context/ThemeContext';
import SurveyComponent from './SurveyComponent';

interface SurveyComponentProps {
  alias: string;
  onFinishedSurvey?: (respondentId: string) => void;
}

const SurveyWrapper = ({ alias, onFinishedSurvey }: SurveyComponentProps) => {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background.secondary }}
    >
      <Toast position="top" topOffset={Platform.OS === 'ios' ? 100 : 60} />
      <SurveyComponent alias={alias} onFinishedSurvey={onFinishedSurvey} />
    </SafeAreaView>
  );
};

export default SurveyWrapper;
