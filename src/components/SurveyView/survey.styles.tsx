/* eslint-disable react-hooks/rules-of-hooks */
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
      width: '100%',
    },

    container: {
      minHeight: 200,
      width: '100%',
      paddingHorizontal: 14,
      paddingVertical: 25,
      backgroundColor: theme.background.primary,
      borderRadius: 16,
      marginHorizontal: 8,
      marginVertical: 8,
      ...theme.shadows.tiny,
      position: 'relative',
    },

    questionAnswerWrapper: {
      flex: 1,
      width: '100%',
    },

    center: {
      paddingTop: Platform.OS === 'android' ? 50 : 20,
      flex: 1,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
    },

    astericsWrapper: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 4,
      borderRadius: 4,
    },

    questionWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      width: '99%',
    },

    questionText: {
      fontSize: theme.sizes.large,
      marginBottom: 12,
      fontFamily: theme.font.medium,
      color: theme.text.primary,
    },

    input: {
      borderColor: theme.border.default,
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      color: theme.text.primary,
      backgroundColor: theme.background.primary,
    },

    activitiIndicator: {
      color: theme.text.primary,
    },
  });
};
