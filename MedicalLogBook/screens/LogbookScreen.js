import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AdmissionsScreen from "../components/AdmissionsScreen";
import { Modal } from "react-native";
import ClinicsScreen from "../components/ClinicsScreen";
import CpdScreens from "../components/CpdScreens";
import ProcedureScreen from "../components/ProcedureScreen";

const LogbookScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      category: "Admissions",
      todo: "Use this category to record patients clerked or admitted to hospital or your specialist service",
    },
    {
      id: 2,
      category: "CPD",
      todo: "Use this category to record academic work, training courses, conferences and seminars.",
    },
    {
      id: 3,
      category: "Clinics",
      todo: "Use this category to record patients seen in the outpatient clinic.",
    },
    {
      id: 4,
      category: "Procedure",
      todo: "Use this category to record medical and surgical procedures.",
    },
  ]);

  const [modalType, setModalType] = useState(null);

  const openModal = (modalType) => {
    setModalType(modalType);
  };
  const closeModal = () => {
    setModalType(null);
  };

  const openSpecificTodoForm = (data) => {
    openModal(data.category);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        openSpecificTodoForm(item);
      }}
      className="p-4 border-b border-gray-200 flex flex-row items-center"
    >
      <View className="p-2 border mr-4">
        <Icon name="plus" size={16} color="black" />
      </View>
      <View className="mr-16">
        <Text className="mb-1">{item.category}</Text>
        <Text className="text-xs ">{item.todo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      {/* <View className="flex-row justify-between items-center mb-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 "
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <View className="absolute right-[20]">
          <Icon name="search" size={16} color="black" />
        </View>
      </View>
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity className="bg-blue-500 text-white py-2 px-4 rounded-md">
          <Text>Sort</Text>
        </TouchableOpacity>
       
      </View> */}

      <View>
        <Text>
          You can record the following clinical activities in your logbook. Use
          the button in the bottom right corner to add a logbook entry.
        </Text>
      </View>
      <View className="mt-2">
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity className="bg-blue-500 text-white py-2 px-4 rounded-full absolute bottom-4 right-4 ">
        <View className="flex flex-row gap-x-2 items-center">
          <Icon name="plus" size={16} color="white" />
          <Text className="text-white font-light">Add Entry</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={todos.some((todo) => todo.category === modalType)}
        onRequestClose={closeModal}
      >
        {modalType === "Admissions" && (
          <AdmissionsScreen onClose={closeModal} />
        )}
        {modalType === "CPD" && <CpdScreens onClose={closeModal} />}
        {modalType === "Clinics" && <ClinicsScreen onClose={closeModal} />}
        {modalType === "Procedure" && <ProcedureScreen onClose={closeModal} />}
      </Modal>
    </View>
  );
};

export default LogbookScreen;
