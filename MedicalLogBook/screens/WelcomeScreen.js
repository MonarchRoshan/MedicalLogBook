import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../themes";
import { useNavigation } from "@react-navigation/core";

export default function () {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        
        <View className="mx-5 mb-20">
          
          <Image
                className="h-100 w-80"
                source={require("../assets/images/logobg.png")}
              />
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            className="shadow p-3 rounded-full mb-5"
            style={{ backgroundColor: colors.button }}
          >
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="shadow p-3 rounded-full"
            style={{ backgroundColor: colors.button }}
          >
            <Text className="text-center text-white text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
          
          
          
        </View>

        
        
      </View>
    </ScreenWrapper>
  );
}
