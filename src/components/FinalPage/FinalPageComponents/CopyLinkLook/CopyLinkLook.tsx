import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { createStyles } from './copyLinkHook.styles';
import { useAppTheme } from '../../../../context/ThemeContext';

interface Props {
  text: string;
}

const CopyLinkLook = ({ text }: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const handleShowSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const copyTextToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(text);
      handleShowSuccess();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={styles.copyLinkLook}>
          <Text style={styles.copyLinkLookText}>{text}</Text>
        </View>
        <TouchableOpacity
          onPress={copyTextToClipboard}
          style={styles.copyButton}
        >
          {!showSuccess ? (
            <Text style={styles.icon}>📋</Text> // Default icon (you can replace with SVG)
          ) : (
            <Text style={[styles.icon, styles.successIcon]}>✔️</Text> // Success icon
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CopyLinkLook;
