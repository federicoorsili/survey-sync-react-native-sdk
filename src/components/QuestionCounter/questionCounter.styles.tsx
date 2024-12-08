/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderBottomWidth: 2,
      borderBottomColor: theme.border.inverse,
      alignItems: 'center',
      marginBottom: 16,
    },
    text: {
      fontSize: 24,
      fontFamily: theme.font.bold,
      color: theme.text.primary,
    },
  });
};
