import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { createStyles } from './redirectButtonLook.styles';
import Toast from 'react-native-toast-message';
import { useAppTheme } from '../../../../context/ThemeContext';

interface Props {
  text: string;
  redirectUrl?: string; // This should correspond to a screen name in your navigation stack
}

const RedirectButtonLook = ({ text, redirectUrl }: Props) => {
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const showToast = (url: string) => {
    Toast.show({
      type: 'error',
      text1: `Unable to open this URL`,
      visibilityTime: 2000,
      text1Style: {
        color: theme.mainColor,
      },
      text2: `${url}`,
    });
  };

  const handlePress = async () => {
    const url = redirectUrl;
    if (url) {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast(url);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RedirectButtonLook;
