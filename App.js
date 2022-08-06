import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const initialState = {
  email: '',
  password: '',
};

const loadApplication = async () => {
  await Font.loadAsync({
    'MouseMemoirs-Regular': require('./assets/fonts/MouseMemoirs-Regular.ttf'),
  });
};

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('./assets/images/macos-big-sur.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello</Text>
                <Text style={styles.headerTitle}>Rost</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  style={styles.input}
                  textAlign={'center'}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  value={state.email}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  textAlign={'center'}
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  value={state.password}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={keyboardHide}
              >
                <Text style={styles.buttonTitle}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
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
    // justifyContent: 'center',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  form: {
    marginHorizontal: 36,
    // marginBottom: 100,
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
    height: 40,
    borderRadius: 6,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: '#6495ed',
        // borderColor: '#f0ffff',
        borderWidth: 0,
      },
      android: {
        backgroundColor: 'transparent',
        borderColor: '#1e90ff',
        borderWidth: 2,
      },
    }),
  },
  buttonTitle: {
    color: '#f0ffff',
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom: 150,
  },
  headerTitle: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'MouseMemoirs-Regular',
  },
});
