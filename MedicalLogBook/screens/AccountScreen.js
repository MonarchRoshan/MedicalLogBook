import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomCamera from "../components/CustomCamera";
import { clearUser } from "../redux/slices/user";
import { clearAllDataFromAsyncStorage } from "../utils";
import { showSnackbar } from "../redux/slices/snackbar";
import { toggleTheme } from "../redux/slices/theme";

const AccountsScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [listStyle, setListStyle] = useState("grid"); // or 'list'

  const [themeColor, setThemeColor] = useState("#3498db"); // default color
  const totalAttachment = 10; // example value
  const totalSizeOnDevice = "100 MB"; // example value

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const toggleListStyle = () => {
    setListStyle((prevStyle) => (prevStyle === "grid" ? "list" : "grid"));
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
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
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled) {
      console.log(result.assets[0].base64);
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    clearAllDataFromAsyncStorage();
    dispatch(showSnackbar({ message: "You have been logged out" }));
    
  };

  const populateData = async () => {
    setEmail(user.authDetails?.email);
  };

  useEffect(() => {
    populateData();
  }, []);

  const goToContact = () => {
    navigation.navigate("Support");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: isDarkMode ? "black" : "white",
      }}
    >
      <View className={`justify-center items-center `}>
        {image ? (
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: image }}
              className={`w-32 h-32 rounded-full mb-4`}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <View className="w-32 h-32 rounded-full border mb-4"></View>
          </TouchableOpacity>
        )}

        <View>
          <Text className="text-center  mb-6">{email}</Text>
        </View>

        <View className={`w-full px-16`}>
          <TouchableOpacity
            onPress={pickImage}
            className={`bg-blue-400 px-4 py-3 rounded-full mb-4 w-full `}
          >
            <Text className={`text-white text-center`}>Update</Text>
          </TouchableOpacity>
        </View>

        <View className={`w-full px-16`}>
          <TouchableOpacity
            onPress={removeImage}
            className={`bg-red-400 px-4 py-3 rounded-full mb-4 w-full `}
          >
            <Text className={`text-white text-center`}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View
          className={`mb-4 flex flex-row items-center justify-between w-full px-4`}
        >
          <Text className={`text-lg font-light`}>UI Style</Text>
          <TouchableOpacity onPress={handleToggleTheme} className={`mt-2`}>
            <Text className={`text-blue-500`}>
              {isDarkMode ? "Dark Mode" : "Light Mode"}
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
            className={`bg-gray-500 px-4 py-3 rounded-full mt-4`}
          >
            <Text className={`text-white text-center`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountsScreen;
