/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 60,
      color: theme.text.primary,
    },

    option: {
      color: theme.text.primary,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      padding: 15,
      marginHorizontal: 10,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
      ...theme.shadows.tiny,
    },

    selectedYes: {
      borderColor: theme.status.success,
      borderWidth: 2,
    },

    selectedNo: {
      borderColor: theme.status.error,
      borderWidth: 2,
    },

    optionText: {
      fontSize: theme.sizes.medium,
      fontFamily: theme.font.bold,
      color: theme.text.primary,
    },

    selectedYesText: {
      color: theme.status.success,
      fontFamily: theme.font.bold,
    },

    selectedNoText: {
      color: theme.status.error,
      fontFamily: theme.font.bold,
    },
  });
};
