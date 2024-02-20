import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveTokenToStorage, getTokenFromStorage } from "../Screens/auth";
import url from'../Screens/Entry'
import { API_BASE_URL } from "./Api";
 export const fetchUserProfile = async () => {
  try {
    const token = await getTokenFromStorage();
  
//console.log('Access Token:', token);

    const response = await fetch('https://1a5c-121-200-52-130.ngrok-free.app/alumni/profile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    //console.log(response);
    if (response.ok) {
      const userProfileData = await response.json();
     // console.log('User Profile:', userProfileData);
      return userProfileData;
    } else {
      console.error('Failed to fetch user profile. Check the API response.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while fetching user profile:', error);
    return null;
  }
};