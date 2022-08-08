import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
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
  Dimensions,
} from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: '',
  password: '',
};

// const loadApplication = async () => {
//   await Font.loadAsync({
//     'MouseMemoirs-Regular': require('./assets/fonts/MouseMemoirs-Regular.ttf'),
//   });
// };

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  // const [isReady, setIsReady] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 20 * 2
  );

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        await Font.loadAsync({
          Roboto: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
          // 'MouseMemoirs-Regular': require('./assets/fonts/MouseMemoirs-Regular.ttf'),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));

        ///from previous useEffect
        const onChange = () => {
          const width = Dimensions.get('window').width - 20 * 2;
          // console.log('width', width);
          setDimensions(width);
        };
        Dimensions.addEventListener('change', onChange);

        return () => {
          Dimensions.remove('change', onChange);
        };
        ///////ffrom previous useEffect///
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // return (
  //   <View
  //     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
  //     onLayout={onLayoutRootView}
  //   >
  //     <Text>SplashScreen Demo! 👋</Text>
  //     {/* <Entypo name="rocket" size={30} /> */}
  //   </View>
  // );

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get('window').width - 20 * 2;
  //     // console.log('width', width);
  //     setDimensions(width);
  //   };
  //   Dimensions.addEventListener('change', onChange);

  //   return () => {
  //     Dimensions.removeEventListener('change', onChange);
  //   };
  // }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
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
                width: dimensions,
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
    alignItems: 'center',
  },
  form: {
    // marginHorizontal: 36,
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
    marginBottom: 120,
  },
  headerTitle: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Roboto',
    // fontFamily: 'MouseMemoirs-Regular',
  },
});
