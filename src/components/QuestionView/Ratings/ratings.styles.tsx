/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../../styles/theme';

const { width } = Dimensions.get('window');
const OPTION_SIZE = width < 380 ? 40 : 48;

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 60,
      alignItems: 'center',
    },

    optionsContainer: {
      alignItems: 'center',
      paddingHorizontal: 16,
    },

    optionContainer: {
      width: OPTION_SIZE,
      height: OPTION_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },

    selectedOption: {
      borderColor: theme.border.default,
      transform: [{ scale: 1 }],
    },

    unselectedOption: {
      borderColor: theme.border.default,
      transform: [{ scale: 0.95 }],
    },

    optionText: {
      fontFamily: theme.font.medium,
      fontSize: width < 380 ? theme.sizes.small : theme.sizes.medium,
    },

    selectedText: {
      color: theme.text.primary,
    },

    unselectedText: {
      color: theme.text.secondary,
    },

    starContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    separator: {
      width: 8,
    },
  });
};
