import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Dropdown } from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { updateSpecificDataService } from "../services/userService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native";
import { setLogbookData } from "../redux/slices/user";
import {CameraButton} from "../components/CameraButton"

const ProceduresScreen = ({ onClose }) => {
  const [Procedures, setProcedures] = useState("");
  const [Hospital, setHospital] = useState("");
  const [Supervision, setSupervision] = useState("");
  const [showSupervisionDropdown, setShowSupervisionDropdown] = useState(false);
  const [Supervisor, setSupervisor] = useState("");
  const [Complications, setComplications] = useState("");
  const [yourReference, setYourReference] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [notes, setNotes] = useState("");

  const [showStartDatePicker, setStartDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const userId = useSelector((state) => state.user.user.authDetails.userId);
  const dispatch = useDispatch();

  const SupervisionOptions = ["Assisted", "Assisting", "Observed"];

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
      Procedures,
      Hospital,
      Supervision,
      Supervisor,
      Complications,
      yourReference,
      followUp,
      notes,
    };

    

    updateSpecificDataService(userId, "procedure", dataObj)
      .then((res) => {
        dispatch(setLogbookData({ keyName: "procedure", data: dataObj }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        onClose();
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
      <View className='mt-20'>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center"  }}>
          Procedures
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
              onChange={handleFromDatePress}
            />
          )}
        </View>
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
