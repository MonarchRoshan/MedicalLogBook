import React, { useState } from 'react';
import { View, TextInput, Button, DatePickerAndroid, Alert, Modal, TouchableOpacity, Text } from 'react-native';

const MyForm = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [fileFormatModalVisible, setFileFormatModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [fileFormat, setFileFormat] = useState('');

  const handleFromDatePress = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'default',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        setFromDate(`${year}-${month + 1}-${day}`);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleToDatePress = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'default',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        setToDate(`${year}-${month + 1}-${day}`);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    setTypeModalVisible(false);
  };

  const handleFileFormatSelect = (selectedFormat) => {
    setFileFormat(selectedFormat);
    setFileFormatModalVisible(false);
  };

  const handleDownload = () => {
    // Add your logic here to download file based on form inputs
    // For demonstration purposes, let's just display an alert
    Alert.alert('Download', 'File will be downloaded based on form inputs.');
  };

  return (
    <View className="p-4">
      <Text className="mb-4">You can record the following clinical activities in your logbook. </Text>
      <TextInput
        className="border border-gray-400 rounded p-2 mb-4"
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        className="border border-gray-400 rounded p-2 mb-4"
        placeholder="Surname"
        value={surname}
        onChangeText={text => setSurname(text)}
      />
      <View className="flex-row mb-4">
        <TextInput
          className="border border-gray-400 rounded p-2 flex-1 mr-2"
          placeholder="From Date"
          value={fromDate}
          editable={false}
        />
        <Button title="Select" onPress={handleFromDatePress} />
      </View>
      <View className="flex-row mb-4">
        <TextInput
          className="border border-gray-400 rounded p-2 flex-1 mr-2"
          placeholder="To Date"
          value={toDate}
          editable={false}
        />
        <Button title="Select" onPress={handleToDatePress} />
      </View>
      <TouchableOpacity onPress={() => setTypeModalVisible(true)} className="border border-gray-400 rounded p-2 mb-4">
        <Text className="text-gray-600">{type ? type : 'Select Type'}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={typeModalVisible}
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded">
            <TouchableOpacity onPress={() => handleTypeSelect('Type 1')}>
              <Text className="text-gray-600 mb-2">Type 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTypeSelect('Type 2')}>
              <Text className="text-gray-600 mb-2">Type 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTypeModalVisible(false)}>
              <Text className="text-red-600">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setFileFormatModalVisible(true)} className="border border-gray-400 rounded p-2 mb-4">
        <Text className="text-gray-600">{fileFormat ? fileFormat : 'Select File Format'}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={fileFormatModalVisible}
        onRequestClose={() => setFileFormatModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded">
            <TouchableOpacity onPress={() => handleFileFormatSelect('PDF')}>
              <Text className="text-gray-600 mb-2">PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFileFormatSelect('CSV')}>
              <Text className="text-gray-600 mb-2">CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFileFormatModalVisible(false)}>
              <Text className="text-red-600">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Button title="Download" onPress={handleDownload} />
    </View>
  );
};

export default MyForm;
