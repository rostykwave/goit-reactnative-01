import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <TouchableOpacity onPress={() => {}} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { height: 300, alignItems: 'center' },
  snap: { color: '#fff' },
  snapContainer: {
    marginTop: 200,
    borderWidth: 1,
    borderColor: '#fff',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CreateScreen;
