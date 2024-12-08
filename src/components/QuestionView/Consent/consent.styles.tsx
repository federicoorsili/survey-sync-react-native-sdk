/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      minHeight: 128,
    },
    touchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },

    checkbox: {
      width: 30,
      height: 30,
      borderWidth: 1,
      borderColor: theme.text.primary,
      borderRadius: 4,
      marginRight: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },

    checkboxChecked: {
      backgroundColor: theme.text.primary,
    },

    checkmark: {
      color: theme.text.inverse,
      fontSize: theme.sizes.large,
    },

    text: {
      flex: 1,
      marginLeft: 4,
      borderBottomWidth: 0.5,
      fontSize: 18,
      borderColor: theme.border.default,
      fontFamily: theme.font.regular,
      color: theme.text.primary,
    },
  });
};
