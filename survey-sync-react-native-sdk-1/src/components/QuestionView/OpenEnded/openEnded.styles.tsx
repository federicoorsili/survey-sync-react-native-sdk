/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: '100%',
    },
    textInput: {
      height: 150,
      marginVertical: 16,
      borderWidth: 1,
      borderColor: theme.border.default,
      color: theme.text.primary,
      padding: 8,
      textAlignVertical: 'top',
      borderRadius: 4,
      backgroundColor: theme.background.primary,
      fontSize: theme.sizes.medium,
    },
  });
};
