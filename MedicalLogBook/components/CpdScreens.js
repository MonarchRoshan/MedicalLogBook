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
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateSpecificDataService } from "../services/userService";
import { useSelector, useDispatch } from "react-redux";
import { setLogbookData } from "../redux/slices/user";
import BackButton from "./BackButton";
import GalleryButton from "../components/GalleryButton.js"
import CameraButton from "./CameraButton.js";
import AttachmentButton from "./AttachmentBotton.js";
const CpdScreens = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [showStartDatePicker, setStartDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [cpdActivityType, setCpdActivityType] = useState("");
  const [showCpdActivityTypeDropdown, setShowCpdActivityTypeDropdown] =
    useState(false);

  const userId = useSelector((state) => state.user.user.authDetails.userId);
  const dispatch = useDispatch();

  const cpdActivityTypes = [
    "E-learning Completed",
    "Training day",
    "Course attended",
  ];

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
      title,
      notes,
      cpdActivityType,
      startDate: new Date(startDate).toDateString(),
    };

    updateSpecificDataService(userId, "cpd", dataObj)
      .then((res) => {
        dispatch(setLogbookData({ keyName: "cpd", data: dataObj }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        onClose();
      });

    console.log(dataObj);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 60 }}>
      <View className="absolute top-0 left-0 ml-2">
                    <BackButton />
                  </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" , marginTop:20}}>
          CPD
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
          <Text style={{ marginBottom: 2 }}>Title:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter title"
            value={title}
            onChangeText={(text) => setTitle(text)}
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
          label="Type of CPD Activity"
          value={cpdActivityType}
          setValue={setCpdActivityType}
          options={cpdActivityTypes}
          showDropdown={showCpdActivityTypeDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowCpdActivityTypeDropdown}
        />
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
          onPress={handleSave}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
        </TouchableOpacity>
      </View>
       <Text style={{marginTop:10, marginLeft:20, fontWeight: "bold"}}>Attachments</Text>
      <View style={{marginLeft:200}}><GalleryButton/></View>
      <View style={{marginLeft:250, marginTop:-33}}><CameraButton/></View>
      <View style={{marginLeft:325, marginTop:-33}}><AttachmentButton/></View>
    </ScrollView>
  );
};

export default CpdScreens;
