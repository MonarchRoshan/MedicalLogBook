import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';

const AdmissionScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [specialtyArea, setSpecialtyArea] = useState('');
  const [outcome, setOutcome] = useState('');
  const [hospital, setHospital] = useState('');
  const [yourReference, setYourReference] = useState('');
  const [age, setAge] = useState('');
  const [problem, setProblem] = useState('');
  const [notes, setNotes] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showSpecialtyAreaDropdown, setShowSpecialtyAreaDropdown] = useState(false);
  const [showOutcomeDropdown, setShowOutcomeDropdown] = useState(false);

  const locations = ['Medical Ward', 'Ambulance Bay', 'Intensive Care Unit'];
  const roles = ['Clerked','Reviewed' ];
  const specialtyAreas = ['Cardiothoracic Surgery', 'Alcohol and Drug Intoxication', 'Allergy'];
  const outcomes = ['Admitted', 'Discharged', 'Ward Care'];

  const handleDropdownSelect = (value, setValueFunction, setShowDropdownFunction) => {
    setValueFunction(value);
    setShowDropdownFunction(false);
  };

  const handleSave = () => {
    // Handle saving form data here
    console.log('Form data saved:', { name, email, location, role, specialtyArea, outcome, hospital, yourReference, age, problem, notes });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 , marginTop: 60}}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Admissions</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Name:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Email:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
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
          setShowDropdown={setShowLocationDropdown}
        />
        <Dropdown
          label="Role"
          value={role}
          setValue={setRole}
          options={roles}
          showDropdown={showRoleDropdown}
          setShowDropdown={setShowRoleDropdown}
        />
        <Dropdown
          label="Specialty Area"
          value={specialtyArea}
          setValue={setSpecialtyArea}
          options={specialtyAreas}
          showDropdown={showSpecialtyAreaDropdown}
          setShowDropdown={setShowSpecialtyAreaDropdown}
        />
        <Dropdown
          label="Outcome"
          value={outcome}
          setValue={setOutcome}
          options={outcomes}
          showDropdown={showOutcomeDropdown}
          setShowDropdown={setShowOutcomeDropdown}
        />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Hospital:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            placeholder="Enter hospital"
            value={hospital}
            onChangeText={(text) => setHospital(text)}
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
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 2 }}>Age:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
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
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            placeholder="Enter problem"
            value={problem}
            onChangeText={(text) => setProblem(text)}
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

export default AdmissionScreen;
