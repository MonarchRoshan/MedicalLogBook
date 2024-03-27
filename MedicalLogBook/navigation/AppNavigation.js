import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useSelector } from "react-redux";
import BottomTabNavigator from "./BottomTabNavigator";
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const user = useSelector((state) => state.user.user);
  // const user = false;

  if (user) {
    return <BottomTabNavigator />;
  } else {
    return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: "modal" }}
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: "modal" }}
          name="SignUp"
          component={SignUpScreen}
        />
      </Stack.Navigator>
    );
  }
}
