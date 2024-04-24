import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataInAsyncStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getDataFromAsyncStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // THE VALUE RECIEVED FROM ASYNC STORAGE IS NOT NULL, THEN WE WILL CONVERT IT INTO JSON AGAIN AND THEN RETURN IT
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const clearAllDataFromAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log("Done.");
};
