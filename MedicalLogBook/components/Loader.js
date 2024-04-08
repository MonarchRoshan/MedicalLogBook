import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="blue" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
