import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveTokenToStorage, getTokenFromStorage } from "../Screens/auth";
import { API_BASE_URL } from "./Api";
 export const fetchUserExperience = async () => {
  try {
    const token = await getTokenFromStorage();
  
    console.log('Access Token:', token);

    const response = await fetch(' http://127.0.0.1:8000/alumni/experiences/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    console.log(response);
    if (response.ok) {
      const userExperience = await response.json();
     //console.log('User Experience:', userExperience);
      return userExperience;
    } 
    else {
      console.error('Failed to fetch user Experience. Check the API response.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while fetching user Experience:', error);
    return null;
  }
};