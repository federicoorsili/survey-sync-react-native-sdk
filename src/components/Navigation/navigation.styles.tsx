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
      gap: 8,
      marginTop: 30,
      width: '100%',
    },

    // Primary button (Next/Submit)
    buttonNext: {
      flex: 1,
      borderRadius: 12,
      // borderWidth: 1,
      // borderStyle: 'solid',
      // paddingHorizontal: 36,

      fontSize: 16,
      fontFamily: theme.font.semiBold,

      paddingVertical: 14,
      alignItems: 'center',
      backgroundColor: theme.primaryColor,
      color: theme.onPrimaryColor,
      // ...theme.shadows.tiny,
    },

    buttonNextDisabled: {
      backgroundColor: theme.primaryColorOpacity60,
    },

    buttonTextDisabled: {
      color: theme.onPrimaryColorOpacity60,
    },

    // Secondary button (Back)
    buttonPrev: {
      // width: '40%',
      flex: 1,
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'solid',
      // paddingHorizontal: 36,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.text.primary,
      backgroundColor: 'transparent',
      // ...theme.shadows.tiny,
    },

    buttonText: {
      fontSize: 16,
      fontFamily: theme.font.semiBold,
      color: theme.text.primary,
    },
  });
};
