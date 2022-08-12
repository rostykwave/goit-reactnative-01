import { Text, View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CreateScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
export default CreateScreen;
