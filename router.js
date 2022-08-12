import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import PostScreen from './screens/mainScreen/PostScreen';
import CreateScreen from './screens/mainScreen/CreateScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
//icons import
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
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
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={{
        // tabBarStyle: { position: 'absolute' },
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="post-add" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-create-outline" size={36} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
