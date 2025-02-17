/* eslint-disable react-native/no-inline-styles */
import { Platform, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAppTheme } from '../../context/ThemeContext';
import SurveyGeneralComponent from '../SurveyGeneralComponent/SurveyGeneralComponent';

interface SurveyComponentProps {
  alias: string;
  onFinishedSurvey?: (respondentId: string) => void;
  searchParams?: Record<string, string | string[]>;
}

const SurveyWrapper = ({
  alias,
  onFinishedSurvey,
  searchParams,
}: SurveyComponentProps) => {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background.secondary }}
    >
      <Toast position="top" topOffset={Platform.OS === 'ios' ? 100 : 60} />
      <SurveyGeneralComponent
        alias={alias}
        onFinishedSurvey={onFinishedSurvey}
        searchParams={searchParams}
      />
    </SafeAreaView>
  );
};

export default SurveyWrapper;
