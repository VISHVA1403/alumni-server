import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import Home from '../Screens/Home';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin=()=>{
    if (email === 'user@example.com' && password === 'password') {
      navigation.navigate(Home);
    } 
    else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  }
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
          value={email}
          onChangeText={setEmail}
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
     backgroundColor: 'wheat',
     position: 'relative',
  },
  back: {
     flex: 2,
     backgroundColor: 'tan',
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
     borderLeftWidth: 215,
     borderRightWidth: 215,
     borderBottomWidth: 250,
     borderLeftColor: 'wheat',
     borderRightColor: 'wheat',
     borderBottomColor: 'tan',
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