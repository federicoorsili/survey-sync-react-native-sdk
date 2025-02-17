import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../../styles/theme';

interface YesNoStyles {
  container: ViewStyle;
  optionContainer: ViewStyle;
  selectedYesContainer: ViewStyle;
  optionText: TextStyle;
  selectedYesText: TextStyle;
}

export const createStyles = (isDark: boolean): YesNoStyles => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme(isDark);

  return StyleSheet.create<YesNoStyles>({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 60,
    },
    optionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      padding: 15,
      marginHorizontal: 10,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
      ...theme.shadows.tiny,
    },
    selectedYesContainer: {
      borderColor: theme.status.success,
      borderWidth: 2,
    },
    optionText: {
      fontSize: theme.sizes.medium,
      fontFamily: theme.font.bold,
      color: theme.text.primary,
    },
    selectedYesText: {
      color: theme.status.success,
      fontFamily: theme.font.bold,
    },
  });
};
