import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../redux/slices/snackbar";
const CommonSnackbar = () => {
  const dispatch = useDispatch();
  const { isVisible, message } = useSelector((state) => state.snackbar);

  const onDismissSnackbar = () => {
    dispatch(hideSnackbar());
  };

  return (
    <View style={styles.container}>
      <Snackbar
        visible={isVisible}
        onDismiss={onDismissSnackbar}
        duration={5000}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 20,
    position: "absolute",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default CommonSnackbar;
