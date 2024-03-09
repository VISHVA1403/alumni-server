import AsyncStorage from "@react-native-async-storage/async-storage";
import url from'./Entry'

 export const LOGIN_URL = " http://127.0.0.1:8000/alumni/login/";
 export const AUTH_URL = " http://127.0.0.1:8000/alumni/login/";

export const saveTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getTokenFromStorage = async () => {
  try {
    const Token = await AsyncStorage.getItem("accessToken");
    return Token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const removeTokenFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};