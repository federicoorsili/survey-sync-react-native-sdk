import { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { createStyles } from './uniquePromoLook.styles';
import { useAppTheme } from '../../../../context/ThemeContext';

interface Props {
  text: string;
}

const UniquePromoLook = ({ text }: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  const handleShowTooltip = () => {
    setShowSuccess(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowSuccess(false));
      }, 2000);
    });
  };

  const copyTextToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(text);
      handleShowTooltip();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={styles.promoLook}>
          <Text style={styles.promoLookText}>{text}</Text>
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

export default UniquePromoLook;
