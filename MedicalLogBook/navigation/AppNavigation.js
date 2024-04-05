import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { useEffect, useState } from "react";
import { getDataFromAsyncStorage } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const userFromRedux = useSelector((state) => state.user.user);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(userFromRedux, "user from redux");

  const checkDataInStorage = () => {
    getDataFromAsyncStorage("user").then((res) => {
      console.log(res, "user from storage");
      if (userFromRedux || res) {
        // asdasdas
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    checkDataInStorage();
  }, [userFromRedux, AsyncStorage]);

  if (isLoggedIn) {
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
