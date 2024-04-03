import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';

const ClinicsScreen = () => {
  const [clinic, setClinic] = useState('');
  const [notes, setNotes] = useState('');
  const [actions, setActions] = useState('');
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [gender, setGender] = useState('');
  const [seenByConsultant, setSeenByConsultant] = useState('');
  const [showSeenByConsultantDropdown, setShowSeenByConsultantDropdown] = useState(false);
  const [newPatient, setNewPatient] = useState('');
  const [problem, setProblem] = useState('');
  const [yourReference, setYourReference] = useState('');

  const actionOptions = ['Follow-up', 'New'];
  const seenByConsultantOptions = ['Yes', 'No'];
  const newPatientOptions = ['Yes', 'No'];

  const handleDropdownSelect = (value, setValueFunction, setShowDropdownFunction) => {
    setValueFunction(value);
    setShowDropdownFunction(false);
  };

  const handleSave = () => {
    // Handle saving form data here
    console.log('Form data saved:', { clinic, notes, actions, gender, seenByConsultant, newPatient, problem, yourReference });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 50 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Clinics</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Clinic Name:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            placeholder="Enter clinic"
            value={clinic}
            onChangeText={(text) => setClinic(text)}
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
          label="Actions"
          value={actions}
          setValue={setActions}
          options={actionOptions}
          showDropdown={showActionsDropdown}
          setShowDropdown={setShowActionsDropdown}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Gender:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
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
          setShowDropdown={setShowSeenByConsultantDropdown}
        />
        <Dropdown
          label="New Patient"
          value={newPatient}
          setValue={setNewPatient}
          options={newPatientOptions}
          showDropdown={showSeenByConsultantDropdown}
          setShowDropdown={setShowSeenByConsultantDropdown}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Problem:</Text>
          <TextInput
            multiline={true}
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            placeholder="Enter problem"
            value={problem}
            onChangeText={(text) => setProblem(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Your Reference:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            placeholder="Enter your reference"
            value={yourReference}
            onChangeText={(text) => setYourReference(text)}
          />
        </View>
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

export default ClinicsScreen;
