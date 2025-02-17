/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    textInput: {
      marginVertical: 16,
      width: '100%',
      minHeight: 50,
      borderWidth: 1,
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 8,
      paddingTop: 12,
      verticalAlign: 'middle',
      fontFamily: theme.font.regular,
      fontSize: theme.sizes.medium,
      color: theme.text.primary,
      borderRadius: 8,
    },

    questionText: {
      fontSize: theme.sizes.medium,
      fontWeight: '600',
      marginBottom: 16,
      color: theme.text.primary,
    },
    optionsContainer: {
      flexGrow: 0,
    },

    optionsList: {
      flexDirection: 'column',
      gap: 12,
    },

    option: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: theme.background.primary,
      borderWidth: 1,
      borderColor: theme.border.default,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: theme.font.regular,
    },

    selectedOption: {
      backgroundColor: theme.text.primary,
      borderColor: theme.text.primary,
      ...theme.shadows.tiny,
    },

    optionImageText: {
      fontSize: theme.sizes.medium,
      color: theme.text.primary,
      textAlign: 'center',
      fontFamily: theme.font.regular,
      marginTop: 10,
    },

    selectedImageOptionText: {
      fontFamily: theme.font.bold,
    },

    optionText: {
      fontSize: theme.sizes.medium,
      color: theme.text.primary,
      textAlign: 'center',
      fontFamily: theme.font.regular,
    },

    selectedOptionText: {
      color: theme.background.primary,
      fontFamily: theme.font.bold,
    },

    imageOptionContainer: {
      width: '100%',
      height: undefined,
      alignSelf: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border.default,
      overflow: 'hidden',
      paddingHorizontal: 10,
      paddingVertical: 14,
      backgroundColor: theme.background.primary,
      marginVertical: 10,
    },

    imageOptionContainerSelected: {
      borderWidth: 2,
      borderColor: theme.text.primary,
    },

    image: {
      borderRadius: 10,
      width: '100%',
      height: 300,
      resizeMode: 'contain',
    },
  });
};
