import { StatusBar } from 'expo-status-bar';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('./assets/images/macos-big-sur.jpg')}
      >
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Username or Email</Text>
            <TextInput style={styles.input} textAlign={'center'} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              textAlign={'center'}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonTitle}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  form: {
    marginHorizontal: 36,
  },
  inputTitle: {
    color: '#f0ffff',
    fontSize: 22,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#deb887',
    height: 40,
    borderRadius: 6,
    color: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#6495ed',
    height: 40,
    borderRadius: 6,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#f0ffff',
    fontSize: 18,
  },
});
