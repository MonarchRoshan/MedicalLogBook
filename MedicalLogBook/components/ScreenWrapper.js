import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, View } from "react-native";

export default function ScreenWrapper({ children }) {
  let StatusBarHeight = StatusBar.currentHeight
    ? StatusBar.currentHeight
    : Platform.OS === "ios"
    ? 30
    : 15;

  return (
    <View style={{ paddingTop: StatusBarHeight, paddingHorizontal: 15 }}>
      {children}
    </View>
  );
}
