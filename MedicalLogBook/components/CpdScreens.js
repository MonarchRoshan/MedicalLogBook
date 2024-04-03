import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';

const CpdScreens = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [cpdActivityType, setCpdActivityType] = useState('');
  const [showCpdActivityTypeDropdown, setShowCpdActivityTypeDropdown] = useState(false);

  const cpdActivityTypes = ['E-learning Completed', 'Training day', 'Course attended'];

  const handleDropdownSelect = (value, setValueFunction, setShowDropdownFunction) => {
    setValueFunction(value);
    setShowDropdownFunction(false);
  };

  const handleSave = () => {
    // Handle saving form data here
    console.log('Form data saved:', { title, notes, cpdActivityType });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 , marginTop: 60}}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>CPD</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Title:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            placeholder="Enter title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Notes:</Text>
          <TextInput
            multiline={true}
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
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
          setShowDropdown={setShowCpdActivityTypeDropdown}
        />
        <TouchableOpacity
          style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
          onPress={handleSave}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Dropdown = ({ label, value, setValue, options, showDropdown, setShowDropdown }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ marginBottom: 2 }}>{label}:</Text>
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
        onPress={() => setShowDropdown(true)}
      >
        <Text>{value || `Select ${label}`}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleDropdownSelect(item, setValue, setShowDropdown)} style={{ padding: 10 }}>
                  <Text style={{ color: 'blue', fontSize: 16 }}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CpdScreens;
