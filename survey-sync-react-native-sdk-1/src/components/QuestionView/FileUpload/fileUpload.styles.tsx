/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export const createStyles = (isDark: boolean) => {
  const theme = useTheme(isDark);

  return StyleSheet.create({
    container: {
      padding: 16,
      width: '100%',
      marginTop: 30,
      marginBottom: 40,
    },
    uploadContainer: {
      minHeight: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.border.default,
      borderStyle: 'dashed',
      borderRadius: 8,
      backgroundColor: theme.background.primary,
      padding: 20,
    },
    uploadText: {
      fontSize: theme.sizes.medium,
      fontWeight: '500',
      color: theme.status.info,
      marginTop: 8,
    },
    uploadSubText: {
      color: theme.text.secondary,
      marginTop: 2,
    },
    filePreviewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: theme.background.primary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border.default,
    },
    fileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    fileDetails: {
      marginLeft: 12,
      flex: 1,
    },
    fileName: {
      fontSize: theme.sizes.medium,
      fontWeight: '500',
      color: theme.text.primary,
    },
    fileSize: {
      fontSize: 14,
      color: theme.text.secondary,
      marginTop: 2,
    },
    removeButton: {
      padding: 8,
    },
  });
};
