import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { useEffect, useState } from "react";
import { getDataFromAsyncStorage } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/slices/user";

const Stack = createNativeStackNavigator();  //allowing to navigate forward and backward through the screens
export default function AppNavigation() {
  const userFromRedux = useSelector((state) => state.user.user); // hook allows you to extract data from the Redux store state

  const dispatch = useDispatch(); //dispatch actions to your Redux store

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(userFromRedux, "user from redux"); // update or indicating whether the user is logged in or not.

  const checkDataInStorage = () => {
    getDataFromAsyncStorage("user").then((res) => {
      console.log(res, "user from storage");
      if (userFromRedux.authDetails.userId) {
        setIsLoggedIn(true);
      } else if (res?.authDetails?.userId) {
        // SO THAT ASYNC STORAGE AND REDUX ALWAYS REMAINS IN SYNC WHILE LOGGIN IN
        dispatch(setUser(res));
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    checkDataInStorage();
  }, [userFromRedux, AsyncStorage]);  // the effect runs checkDataInStorage when either userFromRedux or AsyncStorage changes.

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
