'use client'; // If you're using Next.js App Router, ensures this is a client component
import React, { useEffect, useState } from 'react';
import {
  fetchAccountSettings,
  fetchSurveyDataByAlias,
  startSurvey,
} from '../../api/directAPI';
import { SurveyType } from '../../types/enums';
import type { AccountSettingsResponse, SurveyDto } from '../../types/types';
import SurveyConditionalView from './SurveyConditionalView';
import SurveyStandardView from './SurveyStandardView';
import { useAppTheme } from '../../context/ThemeContext';
import { createStyles } from './survey.styles';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';

export interface SurveyComponentProps {
  alias: string;
  /**
   * Called when the survey is started or finished,
   * passing the new respondentId.
   */
  onFinishedSurvey?: (respondentId: string) => void;

  /**
   * Optional search parameters (e.g. from a query string)
   * If not needed in React Native, you may remove this.
   */
  searchParams?: Record<string, string | string[]>;
}

const SurveyGeneralComponent: React.FC<SurveyComponentProps> = ({
  alias,
  onFinishedSurvey,
  searchParams = {},
}) => {
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const [userLogoData, setUserLogoData] =
    useState<AccountSettingsResponse | null>(null);
  const [survey, setSurvey] = useState<SurveyDto | null>(null);
  const [respondentId, setRespondentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const parameters: Record<string, string[]> = {};
        for (const key in searchParams) {
          if (Object.hasOwn(searchParams, key)) {
            parameters[key] = Array.isArray(searchParams[key])
              ? searchParams[key]
              : [searchParams[key] as string];
          }
        }

        const fetchedUserLogoData = await fetchAccountSettings(alias);
        setUserLogoData(fetchedUserLogoData);

        const fetchedSurvey = await fetchSurveyDataByAlias(alias);
        setSurvey(fetchedSurvey);

        const respId = await startSurvey(fetchedSurvey.id, { parameters });
        setRespondentId(respId.id);
      } catch (error) {
        console.error('Failed to fetch or start survey:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.text.primary} />
      </View>
    );
  }

  if (!userLogoData || !survey || !respondentId) {
    // You can return null or a Text indicating "No data" or an error UI
    return (
      <View style={styles.center}>
        <Text>Data is missing. Please try again.</Text>
      </View>
    );
  }

  const { type: surveyType } = survey;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      {surveyType === SurveyType.STANDARD ? (
        <SurveyStandardView
          loading={loading}
          alias={alias}
          onFinishedSurvey={onFinishedSurvey}
          userLogoData={userLogoData}
          survey={survey}
          respondentId={respondentId}
        />
      ) : (
        <SurveyConditionalView
          loading={loading}
          alias={alias}
          onFinishedSurvey={onFinishedSurvey}
          userLogoData={userLogoData}
          survey={survey}
          respondentId={respondentId}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default SurveyGeneralComponent;
