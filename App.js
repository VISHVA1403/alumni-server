import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Login/'
import Home from './Screens/Home/';
import Profile from './Screens/Profile/'
import Entry from './Screens/Entry/';
import ShowExperience from './Screens/ShowExperience';
import EditProfile from './Screens/editProfile';

export default function App() {
  const Stack = createNativeStackNavigator();
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry">
      <Stack.Screen name="Entry" component={Entry} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home}  options={{headerShown:false}} />
        <Stack.Screen name="Profile" component={Profile}  options={{headerShown:false}} />
        <Stack.Screen name="ShowExperience" component={ShowExperience}  options={{headerShown:false}} />
        <Stack.Screen name="EditProfile" component={EditProfile}  options={{headerShown:false}} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

