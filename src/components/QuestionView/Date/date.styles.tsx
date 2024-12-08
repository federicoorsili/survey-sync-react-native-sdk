/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      marginTop: 30,
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    touchableArea: {
      width: '60%',
      padding: 12,
    },

    inputWrapper: {
      borderWidth: 1,
      borderColor: theme.border.default,
      borderRadius: 8,
      padding: 12,
      backgroundColor: theme.background.primary,
      alignItems: 'center',
    },

    inputText: {
      fontSize: theme.sizes.medium,
      fontFamily: theme.font.medium,
      color: theme.text.primary,
    },
  });
};
