import { View, Text } from 'react-native';
import { createStyles } from './descriptionTextLook.styles';
import { useAppTheme } from '../../../../context/ThemeContext';

interface Props {
  text: string;
}

const DescriptionTextLook = ({ text }: Props) => {
  const { isDark } = useAppTheme();
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default DescriptionTextLook;
