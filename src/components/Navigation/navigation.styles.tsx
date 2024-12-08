/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingBottom: 20,
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginTop: 30,
      width: '100%',
    },

    // Primary button (Next/Submit)
    buttonNext: {
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingHorizontal: 36,
      paddingVertical: 14,
      alignItems: 'center',
      borderColor: theme.border.inverse,
      backgroundColor: theme.background.primary,
      ...theme.shadows.tiny,
    },

    buttonNextDisabled: {
      borderColor: theme.background.primary,
      elevation: 0,
    },

    buttonTextDisabled: {
      color: theme.text.primary,
    },

    // Secondary button (Back)
    buttonPrev: {
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingHorizontal: 36,
      paddingVertical: 14,
      alignItems: 'center',
      borderColor: theme.border.secondary,
      backgroundColor: theme.background.primary,
      ...theme.shadows.tiny,
    },

    buttonText: {
      fontSize: theme.sizes.large,
      fontFamily: theme.font.medium,
      color: theme.text.primary,
    },
  });
};
