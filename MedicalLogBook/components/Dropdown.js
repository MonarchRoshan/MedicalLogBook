import React from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const Dropdown = ({
  label,
  value,
  setValue,
  options,
  showDropdown,
  setShowDropdown,
  handleDropdownSelect,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ marginBottom: 2 }}>{label}:</Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          padding: 10,
        }}
        onPress={() => setShowDropdown(true)}
      >
        {value ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black" }}>{value}</Text>
            <Icon name="caret-down" size={16} color="black" />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray" }}>Select {label}</Text>
            <Icon name="caret-down" size={16} color="black" />
          </View>
        )}
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={showDropdown}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}
          >
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    handleDropdownSelect(item, setValue, setShowDropdown)
                  }
                  style={{ padding: 10 }}
                >
                  <Text style={{ color: "blue", fontSize: 16 }}>{item}</Text>
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
