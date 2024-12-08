import { View } from 'react-native';

const EmptyListPlaceholder = ({ text }: { text: string }) => {
  return (
    <View>
      <View>{text}</View>
    </View>
  );
};

export default EmptyListPlaceholder;
