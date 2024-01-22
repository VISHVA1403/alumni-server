import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import Home from '../Screens/Home';
import * as Keychain from 'react-native-keychain';

const Login = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async ()=>{
  //   if (email === 'sabari@gmail.com' && password === 'password') {
  //     navigation.navigate(Home);
  //   } 
  //   else {
  //     Alert.alert('Login Failed', 'Invalid email or password');
  //   }
  // }

    try {
      const response = await fetch('https://d315-121-200-52-130.ngrok-free.app/alumni/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;

       console.log(responseData)
     //   await Keychain.setGenericPassword('token', token);
        navigation.navigate(Home);
        
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    }
    catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'An error occurred while logging in');
    }
  };

  return (
     <View style={styles.container}>
       <View style={styles.background}>
        <View style={styles.triangle}>
        </View>
       </View>
       <View style={styles.back}>
        <Text style={{fontSize:50,bottom:120,color:'maroon',fontWeight:'700'}}>Login</Text>
          <View style={styles.icon1}>
          <MaterialIcons name='alternate-email' style={styles.Iconname} />
          <TextInput placeholder="Username" style={{ flex: 1 }}
          value={username}
          onChangeText={setusername}
           />
        </View>
        <View style={styles.icon2}>
          <Ionicons name='ios-lock-closed-outline' style={styles.Iconname} />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.forgottext}>Forget?</Text>
          </TouchableOpacity>
        </View>
         
          <TouchableOpacity onPress={handleLogin}style={styles.button}>
            <Text style={styles.buttontext}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.otherlogin}>or, login with...</Text>
          
       </View>
     </View>
  );
 };
 
 const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'white',
  },
  background: {
     flex: 2,
     backgroundColor: 'blue',
     position: 'relative',
  },
  back: {
     flex: 2,
     backgroundColor: 'white',
     justifyContent: 'flex-start',
     alignItems: 'center',
  },
  input: {
    width: '60%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    paddingLeft: 20,
    marginBottom: 20,
    padding: 0,
  },

  triangle: {
      width: 0,
      height: 0,
     backgroundColor: 'transparent',
     borderStyle: 'solid',
     borderLeftWidth: 200,
     borderRightWidth: 212,
     borderBottomWidth: 250,
     borderLeftColor: 'blue',
     borderRightColor: 'blue',
     borderBottomColor: 'white',
     position: 'absolute',
     bottom: 0,
     left: 0,
      right: 0,
  },
  loginText: {
     fontSize: 40,
     color: 'white',
     position: 'absolute',
     bottom: 20, 
     left: 0,
     right: 0,
     textAlign: 'center',
  },
   icon1: {
    bottom:40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    borderBottomColor: 'gray',
    marginLeft:20,
    marginRight:20,
  },
  icon2: {
    bottom:40,
    paddingVertical:10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    borderBottomColor: 'gray',
    marginLeft:20,
    marginRight:20,
  },
  Iconname:{
    fontSize:20,
    marginRight:5,
  }, 
 forgottext:{
    color: 'blue', 
    fontWeight: '700',
     textAlign: 'center',
 },
 button: {
  bottom:30,
  width:'80%',
  backgroundColor: 'purple',
  padding: 10,
  borderRadius: 5,
  
},
buttontext: {
  textAlign: 'center',
  fontWeight: '700',
  fontSize: 16,
  color: 'white',
},
otherlogin:{
  bottom:20,
  textAlign: 'center',
   marginBottom: 30, 
   color: 'black',
   paddingVertical:25,
   fontSize:15,
}
 
 });
 
 export default Login;


