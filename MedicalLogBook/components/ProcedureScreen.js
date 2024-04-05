import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Dropdown } from "./Dropdown";

const ProceduresScreen = () => {
  const [Procedures, setProcedures] = useState("");
  const [Hospital, setHospital] = useState("");
  const [Supervision, setSupervision] = useState("");
  const [showSupervisionDropdown, setShowSupervisionDropdown] = useState(false);
  const [Supervisor, setSupervisor] = useState("");
  const [Complications, setComplications] = useState("");
  const [yourReference, setYourReference] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [notes, setNotes] = useState("");

  const SupervisionOptions = ["Assisted", "Assisting", "Observed"];

  const handleDropdownSelect = (
    value,
    setValueFunction,
    setShowDropdownFunction
  ) => {
    setValueFunction(value);
    setShowDropdownFunction(false);
  };

  const handleSave = () => {
    // Handle saving form data here
    console.log("Form data saved:", {
      Procedures,
      Hospital,
      Supervision,
      Supervisor,
      Complications,
      yourReference,
      followUp,
      notes,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Procedures
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Procedures:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Procedures"
            value={Procedures}
            onChangeText={(text) => setProcedures(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Hospital:</Text>
          <TextInput
            multiline={true}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter notes"
            value={Hospital}
            onChangeText={(text) => setHospital(text)}
          />
        </View>
        <Dropdown
          label="Supervision"
          value={Supervision}
          setValue={setSupervision}
          options={SupervisionOptions}
          showDropdown={showSupervisionDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowSupervisionDropdown}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Supervisor:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Supervisor"
            value={Supervisor}
            onChangeText={(text) => setSupervisor(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Complications:</Text>
          <TextInput
            multiline={true}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Complications"
            value={Complications}
            onChangeText={(text) => setComplications(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Your Reference:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter your reference"
            value={yourReference}
            onChangeText={(text) => setYourReference(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Follow up:</Text>
          <TextInput
            multiline={true}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Follow up (max 500 words)"
            value={followUp}
            onChangeText={(text) => setFollowUp(text)}
            maxLength={500}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Notes:</Text>
          <TextInput
            multiline={true}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Notes"
            value={notes}
            onChangeText={(text) => setNotes(text)}
          />
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
          onPress={handleSave}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProceduresScreen;
