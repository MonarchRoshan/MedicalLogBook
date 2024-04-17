import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { Dropdown } from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { updateSpecificDataService } from "../services/userService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native";
import { setLogbookData } from "../redux/slices/user";

const ClinicsScreen = ({ onClose }) => {
  const [clinic, setClinic] = useState("");
  const [notes, setNotes] = useState("");
  const [actions, setActions] = useState("");
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [gender, setGender] = useState("");
  const [seenByConsultant, setSeenByConsultant] = useState("");
  const [showSeenByConsultantDropdown, setShowSeenByConsultantDropdown] =
    useState(false);
  const [newPatient, setNewPatient] = useState("");
  const [problem, setProblem] = useState("");
  const [yourReference, setYourReference] = useState("");

  const [showStartDatePicker, setStartDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.authDetails.userId);

  const actionOptions = ["Follow-up", "New"];
  const seenByConsultantOptions = ["Yes", "No"];
  const newPatientOptions = ["Yes", "No"];

  const handleDropdownSelect = (
    value,
    setValueFunction,
    setShowDropdownFunction
  ) => {
    setValueFunction(value);
    setShowDropdownFunction(false);
  };

  const toggleStartDatePicker = () => {
    setStartDatePicker((prev) => !prev);
  };

  const handleFromDatePress = (event, selectedDate) => {
    const currentDate = selectedDate;
    toggleStartDatePicker();
    console.log(currentDate);
    setStartDate(currentDate);
  };

  const handleSave = () => {
    // Handle saving form data here
    let dataObj = {
      clinic,
      notes,
      actions,
      gender,
      seenByConsultant,
      newPatient,
      problem,
      yourReference,
    };

    updateSpecificDataService(userId, "clinics", dataObj)
      .then((res) => {
        dispatch(setLogbookData({ keyName: "clinics", data: dataObj }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        onClose();
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Clinics
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <View className="flex-row mb-4">
          <TextInput
            className="border border-gray-400 rounded p-2 flex-1 mr-2"
            placeholder="Choose From Date"
            value={startDate.toDateString()}
            editable={false}
          />

          <Button onPress={toggleStartDatePicker} title="Select" />

          {showStartDatePicker && (
            <DateTimePicker
              testID="dateTimePickerSelectFrom"
              value={startDate}
              maximumDate={new Date()}
              mode={"date"}
              is24Hour={true}
              onChange={handleFromDatePress}
            />
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Clinic Name:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter clinic"
            value={clinic}
            onChangeText={(text) => setClinic(text)}
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
            placeholder="Enter notes"
            value={notes}
            onChangeText={(text) => setNotes(text)}
          />
        </View>
        <Dropdown
          label="Actions"
          value={actions}
          setValue={setActions}
          options={actionOptions}
          showDropdown={showActionsDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowActionsDropdown}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Gender:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
        </View>
        <Dropdown
          label="Seen by Consultant"
          value={seenByConsultant}
          setValue={setSeenByConsultant}
          options={seenByConsultantOptions}
          showDropdown={showSeenByConsultantDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowSeenByConsultantDropdown}
        />
        <Dropdown
          label="New Patient"
          value={newPatient}
          setValue={setNewPatient}
          options={newPatientOptions}
          showDropdown={showSeenByConsultantDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowSeenByConsultantDropdown}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Problem:</Text>
          <TextInput
            multiline={true}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter problem"
            value={problem}
            onChangeText={(text) => setProblem(text)}
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

export default ClinicsScreen;
