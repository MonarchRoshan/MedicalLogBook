import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SiginScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const user = useSelector(state=> state.user.user);

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>

             <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
             <Stack.Screen options={{headerShown: false, presentation:'modal'}} name="SignIn" component={SiginScreen} />
             <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignUpScreen} />
             
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
  
};

