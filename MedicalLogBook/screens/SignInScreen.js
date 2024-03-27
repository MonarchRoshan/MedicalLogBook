import React, { Component, useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../themes";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/core";
import { signInWithFirebase } from "../services/authService";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (email && password) {
      signInWithFirebase(email, password)
        .then((res) => {
          // USER IS VALID, PROCESS AHEAD
          console.log(res);
        })
        .catch((err) => {
          // USER IS INVALID
          console.log(err);
        });
      // navigation.navigate("Home");
    } else {
      // EMAIL AND PASSWORD BOTH ARE NOT ENTERED
    }
  };
  return (
    <ScreenWrapper>
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
                className="p-4 bg-white rounded-full mb-3"
              />
              <Text className={`${colors.heading} text-lg font-bold`}>
                Password
              </Text>
              <TextInput
                value={password}
                secureTextEntry
                onChangeText={(value) => setPassword(value)}
                className="p-4 bg-white rounded-full mb-3"
              />
              <TouchableOpacity className="flex-row justify-end">
                <Text>Forget Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{ backgroundColor: colors.button }}
            className="my-6 rounded-full p-3 shadow-sm-2"
          >
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
