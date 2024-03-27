import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user";

const AccountsScreen = () => {
  const [image, setImage] = useState(null);
  const [listStyle, setListStyle] = useState("grid"); // or 'list'
  const [uiStyle, setUIStyle] = useState("dark"); // or 'light'
  const [themeColor, setThemeColor] = useState("#3498db"); // default color
  const totalAttachment = 10; // example value
  const totalSizeOnDevice = "100 MB"; // example value

  const dispatch = useDispatch();

  const toggleListStyle = () => {
    setListStyle((prevStyle) => (prevStyle === "grid" ? "list" : "grid"));
  };

  const toggleUIStyle = () => {
    setUIStyle((prevStyle) => (prevStyle === "dark" ? "light" : "dark"));
  };

  const changeThemeColor = (color) => {
    // Logic to change theme color
    setThemeColor(color);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    // Logout logic goes here
  };

  return (
    <View className={`justify-center items-center`}>
      {image ? (
        <>
          <Image
            source={{ uri: image }}
            className={`w-32 h-32 rounded-full mb-4`}
          />
        </>
      ) : (
        <>
          <View className="w-32 h-32 rounded-full border mb-4"></View>
        </>
      )}

      <View>
        <Text className="text-center  mb-6">monarchosah033@gmail.com</Text>
      </View>

      <View className={`w-full px-4`}>
        <TouchableOpacity
          onPress={pickImage}
          className={`bg-red-500 px-4 py-3 rounded-full mb-4 w-full `}
        >
          <Text className={`text-white text-center`}>Update</Text>
        </TouchableOpacity>
      </View>

      <View className={`w-full px-4`}>
        <TouchableOpacity
          onPress={removeImage}
          className={`bg-red-500 px-4 py-3 rounded-full mb-4 w-full `}
        >
          <Text className={`text-white text-center`}>Delete</Text>
        </TouchableOpacity>
      </View>

      <View
        className={`mb-4 flex flex-row items-center justify-between w-full px-4`}
      >
        <Text className={`text-lg font-light`}>List Style</Text>
        <TouchableOpacity onPress={toggleListStyle} className={``}>
          <Text className={`text-blue-500`}>
            {listStyle === "grid" ? "Grid View" : "List View"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className={`mb-4 flex flex-row items-center justify-between w-full px-4`}
      >
        <Text className={`text-lg font-light`}>UI Style</Text>
        <TouchableOpacity onPress={toggleUIStyle} className={`mt-2`}>
          <Text className={`text-blue-500`}>
            {uiStyle === "dark" ? "Dark Mode" : "Light Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className={`mb-4 flex flex-row items-center justify-between w-full px-4`}
      >
        <Text className={`text-lg font-light`}>Theme Color</Text>

        <View className={`flex-row mt-2`}>
          <TouchableOpacity
            onPress={() => changeThemeColor("#3498db")}
            style={[
              `mr-2 rounded-full`,
              { backgroundColor: "#3498db", width: 40, height: 40 },
            ]}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeThemeColor("#ff6347")}
            style={[
              `mr-2 rounded-full`,
              { backgroundColor: "#ff6347", width: 40, height: 40 },
            ]}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeThemeColor("#32cd32")}
            style={[
              `rounded-full`,
              { backgroundColor: "#32cd32", width: 40, height: 40 },
            ]}
          ></TouchableOpacity>
        </View>
      </View>

      <View className={`mb-4`}>
        <Text className={`text-lg font-light`}>Total Attachment</Text>
        <Text className={`mt-2 text-center`}>{totalAttachment}</Text>
      </View>

      <View>
        <Text className={`text-lg font-light`}>Total Size on Device</Text>
        <Text className={`mt-2 text-center`}>{totalSizeOnDevice}</Text>
      </View>

      <View className={`w-full px-4`}>
        <TouchableOpacity
          onPress={handleLogout}
          className={`bg-gray-500 px-4 py-3 rounded-full mt-4`}
        >
          <Text className={`text-white text-center`}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountsScreen;
