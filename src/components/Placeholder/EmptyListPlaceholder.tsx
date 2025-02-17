import { StyleSheet, Text, View } from 'react-native';

const EmptyListPlaceholder = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styling for the outer container
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    // styling for your text
    fontSize: 16,
    color: '#888',
  },
});

export default EmptyListPlaceholder;
