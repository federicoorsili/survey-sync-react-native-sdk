/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    containerWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },

    container: {
      width: '100%',
      padding: 16,
      gap: 10,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderRadius: 8,
    },

    contentWrapper: {
      width: '100%',
      maxWidth: 600,
      padding: 20,
    },
    title: {
      fontSize: theme.sizes.xLarge,
      fontFamily: theme.font.bold,
      marginTop: 16,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: theme.sizes.medium,
      marginTop: 16,
      textAlign: 'center',
      color: theme.text.secondary,
    },
  });
};
