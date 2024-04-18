import React, { useState } from "react";
import { Modal } from "react-native";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import TermsAndConditionsScreen from "./TermsAndConditionsScreen";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [modalType, setModalType] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Form Data",
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
  };

  const openModal = (modalName) => {
    setModalType(modalName);
  };

  const closeModal = () => {
    setModalType("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Request Support</Text>
      <Text style={styles.text}>
        Please fill in the details below to submit a support request.We will
        will be in contact as soon as possible to resolve your issue, Please
        include as much details as possible as this will help expedite the
        resolution process.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />

      <TouchableOpacity
        className={`mb-4 mt-6 flex flex-row items-center justify-between w-full px-4`}
        onPress={() => {
          openModal("share");
        }}
      >
        <Text className={`text-lg font-light`}>Share</Text>
        <Text className={`text-blue-500`}>{">"} </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`mb-4 flex flex-row items-center justify-between w-full px-4`}
        onPress={() => {
          openModal("terms");
        }}
      >
        <Text className={`text-lg font-light`}>Terms and Conditions</Text>
        <Text className={`text-blue-500`}>{">"} </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalType === "terms"}
        onRequestClose={closeModal}
      >
        {modalType === "terms" && (
          <TermsAndConditionsScreen onClose={closeModal} />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    paddingBottom: 50,
  },
});

export default ContactForm;
