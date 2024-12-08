/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 20,
    },

    textWrapper: {
      borderRadius: 8,
    },

    text: {
      color: theme.text.primary,
      textAlign: 'center',
      fontFamily: theme.font.bold,
      fontSize: theme.sizes.xLarge,
    },
  });
};
