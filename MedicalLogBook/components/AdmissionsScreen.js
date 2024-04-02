import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AdmissionsScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    fromDate: new Date(),
    toDate: new Date(),
    typeModalVisible: false,
    fileFormatModalVisible: false,
    type: "",
    fileFormat: "",
  });

  const [showStartDatePicker, setStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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

  const handleTypeSelect = (selectedType) => {
    setFormData({
      ...formData,
      type: selectedType,
      typeModalVisible: false,
    });
  };

  const handleFileFormatSelect = (selectedFormat) => {
    setFormData({
      ...formData,
      fileFormat: selectedFormat,
      fileFormatModalVisible: false,
    });
  };

  const handleDownload = () => {
    // Add your logic here to download file based on form inputs
    // For demonstration purposes, let's just display an alert
    Alert.alert("Download", "File will be downloaded based on form inputs.");
  };

  console.log(formData);

  return (
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
      <TouchableOpacity
        onPress={() => setFormData({ ...formData, typeModalVisible: true })}
        className="border border-gray-400 rounded p-2 mb-4"
      >
        <Text className="text-gray-600">
          {formData.type ? formData.type : "Select Type"}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={formData.typeModalVisible}
        onRequestClose={() =>
          setFormData({ ...formData, typeModalVisible: false })
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 16, borderRadius: 8 }}
          >
            <TouchableOpacity onPress={() => handleTypeSelect("Type 1")}>
              <Text style={{ color: "gray", marginBottom: 8 }}>Type 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTypeSelect("Type 2")}>
              <Text style={{ color: "gray", marginBottom: 8 }}>Type 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setFormData({ ...formData, typeModalVisible: false })
              }
            >
              <Text style={{ color: "red" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() =>
          setFormData({ ...formData, fileFormatModalVisible: true })
        }
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 4,
          padding: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "gray" }}>
          {formData.fileFormat ? formData.fileFormat : "Select File Format"}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={formData.fileFormatModalVisible}
        onRequestClose={() =>
          setFormData({ ...formData, fileFormatModalVisible: false })
        }
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded">
            <TouchableOpacity onPress={() => handleFileFormatSelect("PDF")}>
              <Text className="text-gray-600 mb-2">PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFileFormatSelect("CSV")}>
              <Text className="text-gray-600 mb-2">CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setFormData({ ...formData, fileFormatModalVisible: false })
              }
            >
              <Text className="text-red-600">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Button title="Download" onPress={handleDownload} />
    </View>
  );
};

export default AdmissionsScreen;
