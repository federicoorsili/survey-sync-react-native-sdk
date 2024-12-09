/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      width: '100%',
    },
    textWrapper: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginLeft: 4,
      borderRadius: 8,
      justifyContent: 'center',
      width: '100%',
    },

    text: {
      textAlign: 'center',
      color: theme.text.primary,
      fontSize: theme.sizes.medium,
      maxWidth: 640,
      width: '100%',
      fontFamily: theme.font.medium,
    },
  });
};
