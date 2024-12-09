/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 30,
      paddingBottom: 40,
      paddingHorizontal: 4,
    },

    input: {
      width: '100%',
      minHeight: 50,
      borderWidth: 1,
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 8,
      paddingTop: 12,
      verticalAlign: 'middle',
      fontFamily: theme.font.regular,
      fontSize: theme.sizes.medium,
      color: theme.text.primary,
      borderRadius: 8,
    },
  });
};
