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
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../redux/slices/snackbar";
import moment from "moment";

import Icon from "react-native-vector-icons/FontAwesome";
import { json2csv } from "json-2-csv";

const reportTypes = ["Admissions", "CPD", "Clinics", "Procedure"];

const fileFormatTypes = ["CSV", "PDF"];

const ReportSection = ({ reports }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Previously created reports</Text>
      <ScrollView
        horizontal
        style={{ alignSelf: "center", marginVertical: 20 }}
      >
        <View>
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, { textAlign: "left" }]}>Srno.</Text>
            <Text style={[styles.cell, { textAlign: "left" }]}>Date</Text>
            <Text style={[styles.cell, { textAlign: "left" }]}>File Name</Text>
            {/* <Text style={styles.cell}></Text> */}
          </View>
          {reports.map((report, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{report.date}</Text>
              <Text style={styles.cell}>{report.fileName}</Text>
              <TouchableOpacity>
                <Icon name="download" size={16} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,

//     paddingHorizontal: 10,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingVertical: 10,
//   },
//   header: {
//     backgroundColor: "#f0f0f0",
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//   },
//   cell: {
//     flex: 1,
//     marginHorizontal: 25,
//     textAlign: "center",
//   },
// });

const TableComponent = ({ data }) => {
  // Check if data is available
  if (!data || data.length === 0) {
    return <Text>No data available</Text>;
  }

  // Extract keys from the first object in the array
  const keys = Object.keys(data[0]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {keys.map((key) => (
          <Text key={key} style={styles.headerText}>
            {key}
          </Text>
        ))}
      </View>
      <View style={styles.body}>
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            {keys.map((key) => (
              <Text key={key} style={styles.cell}>
                {item[key]}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
  body: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 10,
  },
});

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

  const [reports, setReports] = useState([]);

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

  // const reports = [
  //   { date: "2024-04-19", fileName: "report1.pdf" },
  //   { date: "2024-04-18", fileName: "report2.pdf" },
  //   // Add more report objects as needed
  // ];

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

      // conversionV2(filteredData);

      // conversion3(filteredData);
      setReports(filteredData);

      // console.log(filteredData, "filterd");
    }
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
          title="Get Analysis Report"
          onPress={handleDownload}
          disabled={!isDownloadAllowed}
        />

        <View>
        <ScrollView horizontal>
          {/* <ReportSection reports={reports} /> */}
          <TableComponent data={reports} />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyForm;
