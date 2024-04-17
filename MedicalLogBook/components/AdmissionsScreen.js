import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Button,
} from "react-native";
import { Dropdown } from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { updateSpecificDataService } from "../services/userService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { setLogbookData, setUser } from "../redux/slices/user";

const AdmissionScreen = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [specialtyArea, setSpecialtyArea] = useState("");
  const [outcome, setOutcome] = useState("");
  const [hospital, setHospital] = useState("");
  const [yourReference, setYourReference] = useState("");
  const [age, setAge] = useState("");
  const [problem, setProblem] = useState("");
  const [notes, setNotes] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showSpecialtyAreaDropdown, setShowSpecialtyAreaDropdown] =
    useState(false);
  const [showOutcomeDropdown, setShowOutcomeDropdown] = useState(false);
  const [showStartDatePicker, setStartDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const userId = useSelector((state) => state.user.user.authDetails.userId);

  const dispatch = useDispatch();

  const locations = ["Medical Ward", "Ambulance Bay", "Intensive Care Unit"];
  const roles = ["Clerked", "Reviewed"];
  const specialtyAreas = [
    "Cardiothoracic Surgery",
    "Alcohol and Drug Intoxication",
    "Allergy",
  ];
  const outcomes = ["Admitted", "Discharged", "Ward Care"];

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
      name,
      email,
      location,
      role,
      specialtyArea,
      outcome,
      hospital,
      yourReference,
      age,
      problem,
      notes,
      startDate: new Date(startDate).toDateString(),
    };

    updateSpecificDataService(userId, "admissions", dataObj)
      .then((res) => {
        dispatch(setLogbookData({ keyName: "admissions", data: dataObj }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        onClose();
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Admissions
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
              mode={"date"}
              is24Hour={true}
              maximumDate={new Date()}
              onChange={handleFromDatePress}
            />
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Name:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Email:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        <Dropdown
          label="Location"
          value={location}
          setValue={setLocation}
          options={locations}
          showDropdown={showLocationDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowLocationDropdown}
        />
        <Dropdown
          label="Role"
          value={role}
          setValue={setRole}
          options={roles}
          showDropdown={showRoleDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowRoleDropdown}
        />
        <Dropdown
          label="Specialty Area"
          value={specialtyArea}
          setValue={setSpecialtyArea}
          options={specialtyAreas}
          showDropdown={showSpecialtyAreaDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowSpecialtyAreaDropdown}
        />
        <Dropdown
          label="Outcome"
          value={outcome}
          setValue={setOutcome}
          options={outcomes}
          showDropdown={showOutcomeDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowOutcomeDropdown}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Hospital:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter hospital"
            value={hospital}
            onChangeText={(text) => setHospital(text)}
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
          <Text style={{ marginBottom: 2 }}>Age:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter age"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
        </View>
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

export default AdmissionScreen;
