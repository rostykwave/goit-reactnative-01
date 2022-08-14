import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useState } from 'react';

const CreateScreen = () => {
  const [camera, setCamera] = useState(null);

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      console.log(photo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    // height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  snap: { color: '#fff' },
  snapContainer: {
    // marginTop: 200,
    borderWidth: 1,
    borderColor: '#fff',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CreateScreen;
