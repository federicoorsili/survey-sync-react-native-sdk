/* eslint-disable react-hooks/rules-of-hooks */
import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

const { width } = Dimensions.get('window');
const OPTION_SIZE = width <= 375 ? 24 : 28;

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
    },

    optionsContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 6,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },

    optionContainer: {
      width: OPTION_SIZE,
      height: OPTION_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
    },

    selectedOption: {
      borderColor: theme.text.primary,
      transform: [{ scale: 1 }],
    },

    unselectedOption: {
      borderColor: theme.border.default,
      transform: [{ scale: 0.95 }],
    },

    optionText: {
      fontFamily: theme.font.regular,
      fontSize: theme.sizes.small,
    },

    unselectedText: {
      color: theme.text.primary,
    },

    circleContainer: {
      width: OPTION_SIZE,
      height: OPTION_SIZE,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: theme.border.inverse,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background.primary,
    },

    selectedCircle: {
      backgroundColor: theme.text.primary,
      borderColor: theme.text.primary,
    },

    circleText: {
      fontSize: theme.sizes.small,
      fontFamily: theme.font.medium,
      color: theme.text.primary,
    },

    selectedCircleText: {
      color: theme.text.inverse,
    },
  });
};
