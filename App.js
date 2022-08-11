import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import { View } from 'react-native';
import PostScreen from './screens/mainScreen/PostScreen';
import CreateScreen from './screens/mainScreen/CreateScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';

SplashScreen.preventAutoHideAsync();

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

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

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <MainTab.Navigator>
          <MainTab.Screen name="Posts" component={PostScreen} />
          <MainTab.Screen name="Create" component={CreateScreen} />
          <MainTab.Screen name="Profile" component={ProfileScreen} />
        </MainTab.Navigator>
        {/* <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
        </AuthStack.Navigator> */}
      </NavigationContainer>
    </View>
  );
}
