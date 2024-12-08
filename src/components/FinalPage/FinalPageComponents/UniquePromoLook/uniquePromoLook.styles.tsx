/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      width: '100%',
    },
    inputWrapper: {
      position: 'relative',
      width: '100%',
    },

    promoLook: {
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

    promoLookText: {
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
      color: theme.text.secondary,
    },
    tooltip: {
      marginTop: 8,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },

    tooltipText: {
      color: theme.text.inverse,
      fontWeight: '500',
    },
  });
};
