/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: '100%',
      marginVertical: 10,
    },
    inputWrapper: {
      position: 'relative',
      width: '100%',
    },

    input: {
      backgroundColor: theme.background.primary,
      borderWidth: 1,
      borderColor: theme.border.default,
      borderRadius: 8,
      padding: 10,
      fontSize: 14,
      color: theme.text.secondary,
      paddingRight: 40,
    },

    copyLinkLook: {
      backgroundColor: theme.background.primary,
      borderWidth: 1,
      borderColor: theme.border.default,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 14,
      color: theme.text.secondary,
      paddingRight: 40,
      width: '100%',
    },

    copyLinkLookText: {
      color: theme.text.secondary,
    },

    copyButton: {
      position: 'absolute',
      right: 5,
      top: '30%',
      transform: [{ translateY: -12 }],
      padding: 8,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },

    icon: {
      fontSize: theme.sizes.medium,
      color: theme.text.secondary,
    },

    successIcon: {
      color: theme.status.success,
    },
  });
};
