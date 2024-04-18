import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text>
        By accessing or using Medical Logbook, you acknowledge that you have
        read, understood, and agree to be bound by these terms and conditions.
        If you do not agree to these terms, please do not use the app.
      </Text>
      <Text style={styles.sectionTitle}>2. Medical Disclaimer</Text>
      <Text>
        Medical Logbook is not a substitute for professional medical advice,
        diagnosis, or treatment. Always seek the advice of your physician or
        other qualified health provider with any questions you may have
        regarding a medical condition. Never disregard professional medical
        advice or delay in seeking it because of something you have read on
        Medical Logbook.
      </Text>
      {/* Repeat the above pattern for each section of the terms and conditions */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default TermsAndConditionsScreen;
