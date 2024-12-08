/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      marginVertical: 20,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },

    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
      ...theme.shadows.tiny,
      borderRadius: 8,
      minWidth: 100,
      paddingVertical: 10,
      paddingHorizontal: 20,
      elevation: 2,
    },

    buttonText: {
      color: theme.text.primary,
      fontSize: theme.sizes.large,
      fontFamily: theme.font.bold,
      textAlign: 'center',
    },
  });
};
