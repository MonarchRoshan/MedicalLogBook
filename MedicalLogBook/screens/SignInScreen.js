import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../themes";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/core";
import { signInWithFirebase } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user";
import { showSnackbar } from "../redux/slices/snackbar";
import { firebaseErrors } from "../utils/firebaseErrors";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validateForm = () => {
    let errors = {};

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // ADDED SAMPLE COMMENT

  const handleSubmit = () => {
    if (isFormValid) {
      signInWithFirebase(email, password)
        .then((res) => {
          // USER IS VALID, PROCESS AHEAD
          if (res.authDetails) {
            dispatch(showSnackbar({ message: "Login Successful" }));
            dispatch(setUser(res));
          } else {
            const errorMessage = firebaseErrors[res.code].message;
            dispatch(showSnackbar({ message: errorMessage }));
          }
        })
        .catch((error) => {
          // USER IS INVALID
          console.log(error);
          // console.log(error, "sdfsdfsdf");
          // const errorMessage = firebaseErrors[error.code].message;
          // dispatch(showSnackbar({ message: errorMessage }));
        });
      // navigation.navigate("Home");
    } else {
      // EMAIL AND PASSWORD BOTH ARE NOT ENTERED
    }
  };

  useEffect(() => {
    // Trigger form validation when ,
    // email, or password changes
    if (email.length > 0 || password.length > 0) validateForm();
  }, [email, password]);

  return (
    <ScrollView>
      <ScreenWrapper>
        <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={-500}>
          <View className="flex justify-between h-full mt-5">
            <View>
              <View className="relative mt-5 ml-1">
                <View>
                  <View className="absolute top-0 left-0">
                    <BackButton />
                  </View>

                  <Text
                    className={`${colors.heading} text-xl font-bold text-center`}
                  >
                    Sign In
                  </Text>
                </View>

                <View className="flex-row justify-center my-3 mt-5">
                  <Image
                    className="h-80 w-80 "
                    source={require("../assets/images/login.png")}
                  />
                </View>

                <View className="space-y-2 mx-2">
                  <Text className={`${colors.heading} text-lg font-bold`}>
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)}
                    returnKeyType="next"
                    placeholder="johnny@yahoo.com"
                    onSubmitEditing={() => {
                      this.password.focus();
                    }}
                    blurOnSubmit={false}
                    placeholderTextColor={"grey"}
                    className="p-4 bg-white rounded-full  "
                  />
                  <View>
                    {errors["email"] && (
                      <Text key="email" className="text-red-500 text-xs">
                        {errors.email}
                      </Text>
                    )}
                  </View>
                  <Text className={`${colors.heading} text-lg font-bold`}>
                    Password
                  </Text>
                  <TextInput
                    value={password}
                    ref={(input) => {
                      this.password = input;
                    }}
                    placeholder="******"
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    onChangeText={(value) => setPassword(value)}
                    className="p-4 bg-white rounded-full"
                  />

                  <View>
                    {errors["password"] && (
                      <Text
                        key="password"
                        className="text-red-500 absolute text-xs"
                      >
                        {errors.password}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity className="flex-row justify-end">
                    <Text>Forget Password?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isFormValid}
                style={{
                  backgroundColor: isFormValid ? colors.button : "lightgrey",
                }}
                className="my-6 rounded-full p-3 shadow-sm-2"
              >
                <Text className="text-center text-white text-lg font-bold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    </ScrollView>
  );
}
