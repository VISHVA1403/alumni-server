import AsyncStorage from "@react-native-async-storage/async-storage";
import url from'./Entry'

 export const LOGIN_URL = "https://1a5c-121-200-52-130.ngrok-free.app/alumni/login/";
 export const AUTH_URL = "https://1a5c-121-200-52-130.ngrok-free.app/alumni/login/";

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