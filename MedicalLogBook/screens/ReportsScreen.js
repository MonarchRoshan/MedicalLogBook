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
  Linking,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../redux/slices/snackbar";
import moment from "moment";
import * as FileSystem from "expo-file-system";

const reportTypes = ["Admissions", "CPD", "Clinics", "Procedure"];

const fileFormatTypes = ["CSV", "PDF"];

const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    fromDate: new Date(),
    toDate: new Date(),
  });

  const { userDetails } = useSelector((state) => state.user.user);
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

  const convertJsonToCsv = async (data) => {
    try {
      const csvData = convertToCSV(data);

      const fileUri = FileSystem.documentDirectory + "data.csv";
      await FileSystem.writeAsStringAsync(fileUri, csvData);

      console.log(data);
      console.table(csvData);
      console.log(fileUri);

      // Open the file for download
      Linking.openURL(fileUri);

      dispatch(
        showSnackbar({
          message:
            "Your selected file will be downloaded based on form inputs at ",
        })
      );
    } catch (error) {
      console.error("Error converting JSON to CSV:", error);

      dispatch(
        showSnackbar({
          message: "Failed to create CSV file.",
        })
      );
    }
  };

  const handleDownload = () => {
    const currentDataArray = [...userDetails[reportType.toLocaleLowerCase()]];

    if (currentDataArray.length === 0) {
      dispatch(
        showSnackbar({
          message: "No Data Found in " + reportType,
        })
      );
    } else {
      const filteredData = currentDataArray
        .filter((item) => {
          const itemDate = moment(item.startDate);
          return itemDate.isBetween(
            formData.fromDate.setHours(0, 0, 0, 0),
            formData.toDate.setHours(23, 59, 59, 0),
            null,
            "[]"
          ); // '[]' includes both start and end dates
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      convertJsonToCsv(filteredData)
        .then((res) => {})
        .catch((error) => {});

      console.log(filteredData);
    }
  };

  const convertToCSV = (objArray) => {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  };

  const isDownloadAllowed = reportType.length > 0 && fileFormat.length > 0;

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
              maximumDate={new Date()}
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
              maximumDate={new Date()}
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

        <Button
          title="Download"
          onPress={handleDownload}
          disabled={!isDownloadAllowed}
        />
      </View>
    </ScrollView>
  );
};

export default MyForm;

// server {
//   listen 5000 default_server;
//   server_name _;

//   # node api reverse proxy
//   location / {
//     proxy_pass http://localhost:5000/;
//   }
// }
