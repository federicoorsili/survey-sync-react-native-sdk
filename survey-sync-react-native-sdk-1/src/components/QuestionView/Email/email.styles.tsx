/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      marginTop: 40,
      marginBottom: 60,
      width: '90%',
      alignSelf: 'center',
    },

    input: {
      backgroundColor: theme.background.primary,
      borderWidth: 1,
      borderColor: theme.border.default,
      paddingHorizontal: 10,
      paddingVertical: 10,
      fontSize: theme.sizes.medium,
      borderRadius: 8,
      color: theme.text.primary,
    },
  });
};
