
import axios from 'axios';

const API_URL = 'https://your-api-url.com/api';

export const login = async (username, password) => {
  try {

    const response = await axios.post(`${API_URL}/login/`, {
      username: username,
      password: password,
    });

    if (response.data.success) {
      return { success: true, message: 'Login successful', user: response.data.user };
    } else {
    
      return { success: false, message: 'Login failed' };
    }
  } catch (error) {

    return { success: false, message: 'Login failed' };
  }
};
