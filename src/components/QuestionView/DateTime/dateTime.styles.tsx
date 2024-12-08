/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
    touchableArea: {
      flex: 1,
      marginRight: 5,
      padding: 12,
    },
    timeTouchableArea: {
      marginLeft: 5,
    },

    inputWrapper: {
      borderWidth: 1,
      borderColor: theme.border.default,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 8,
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
