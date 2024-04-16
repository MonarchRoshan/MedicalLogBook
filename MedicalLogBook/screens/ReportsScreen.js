import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "../components/Dropdown";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/slices/snackbar";
const reportTypes = ["Admissions", "CPD", "Clinics", "Procedure"];

const fileFormatTypes = ["CSV", "PDF"];

const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    fromDate: new Date(),
    toDate: new Date(),
  });

  const [showStartDatePicker, setStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [reportType, setReportType] = useState("");
  const [showReportDropdown, setShowReportDropdown] = useState(false);

  const [fileFormat, setFileFormat] = useState("");
  const [showFileFormatDropdown, setShowFileFormatDropdown] = useState(false);

  const dispatch = useDispatch();
  const toggleStartDatePicker = () => {
    setStartDatePicker((prev) => !prev);
  };
  const toggleEndDatePicker = () => {
    setShowEndDatePicker((prev) => !prev);
  };

  const handleFromDatePress = (event, selectedDate) => {
    const currentDate = selectedDate;
    toggleStartDatePicker();
    setFormData({ ...formData, fromDate: currentDate });
  };

  const handleToDatePress = (event, selectedDate) => {
    const currentDate = selectedDate;
    toggleEndDatePicker();
    setFormData({ ...formData, toDate: currentDate });
  };

  const handleDropdownSelect = (
    value,
    setValueFunction,
    setShowDropdownFunction
  ) => {
    setValueFunction(value);
    setShowDropdownFunction(false);
  };

  const handleDownload = () => {
    dispatch(
      showSnackbar({
        message: "Your selected file will be downloaded based on form inputs.",
      })
    );

    const dataObj = {
      ...formData,
      reportType,
      fileFormat,
    };
    console.log(dataObj);
  };

  return (
    <ScrollView>
      <View className="p-4">
        <Text className="mb-4">
          You can record the following clinical activities in your logbook.{" "}
        </Text>
        <TextInput
          className="border border-gray-400 rounded p-2 mb-4"
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />
        <TextInput
          className="border border-gray-400 rounded p-2 mb-4"
          placeholder="Surname"
          value={formData.surname}
          onChangeText={(text) => setFormData({ ...formData, surname: text })}
        />
        <View className="flex-row mb-4">
          <TextInput
            className="border border-gray-400 rounded p-2 flex-1 mr-2"
            placeholder="Choose From Date"
            value={formData.fromDate.toDateString()}
            editable={false}
          />

          <Button onPress={toggleStartDatePicker} title="Select" />

          {showStartDatePicker && (
            <DateTimePicker
              testID="dateTimePickerSelectFrom"
              value={formData.fromDate}
              mode={"date"}
              is24Hour={true}
              onChange={handleFromDatePress}
            />
          )}
        </View>
        <View className="flex-row mb-4">
          <TextInput
            className="border border-gray-400 rounded p-2 flex-1 mr-2"
            placeholder="Choose End Date"
            value={formData.toDate.toDateString()}
            editable={false}
          />
          <Button onPress={toggleEndDatePicker} title="Select" />

          {showEndDatePicker && (
            <DateTimePicker
              testID="dateTimePickerSelectTo"
              value={formData.toDate}
              mode={"date"}
              is24Hour={true}
              onChange={handleToDatePress}
            />
          )}
        </View>
        <Dropdown
          label="Report type"
          value={reportType}
          setValue={setReportType}
          options={reportTypes}
          showDropdown={showReportDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowReportDropdown}
        />

        <Dropdown
          label="File Format"
          value={fileFormat}
          setValue={setFileFormat}
          options={fileFormatTypes}
          showDropdown={showFileFormatDropdown}
          handleDropdownSelect={handleDropdownSelect}
          setShowDropdown={setShowFileFormatDropdown}
        />

        <Button title="Download" onPress={handleDownload} />
      </View>
    </ScrollView>
  );
};

export default MyForm;
