import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Svg, { Polygon } from 'react-native-svg';





// const Login = () => {


//  const handleLogin = () => {
//     // Add your login logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//  };
//   return (
//    <View style={styles.container}>
//       <View style={styles.blueBackground}>
//       <Text style={styles.loginText}>Login</Text>
//       </View>
//       <View style={styles.whiteBackground}>
      
//         <View style={styles.icon}>
//       <TouchableOpacity style={styles.forgotButton}>
//         <Text style={styles.forgotButtonText}>Forgot Password?</Text>
//       </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       </View>
//       <View style={styles.otherlogin}>
//       <Text>-----or Login in with-----</Text>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'mistyrose',
//     justifyContent:'center',
//   },
//   blueBackground: {
//     flex: 2, 
//     backgroundColor: 'lightskyblue',
//     borderBottomLeftRadius: 0, 
//     borderBottomRightRadius: 300, 
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   whiteBackground: {
//     flex: 2, 
//     justifyContent: "flex-start",
//     alignItems: 'center',
//     paddingVertical:10
    
//   },

// },

//   loginText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign:'auto',
//     marginTop: 40,
//     color: 'black',
//     justifyContent:'center'
//   },



// },
// button: {
//    width: '80%',
//    backgroundColor: '#4f83cc',
//    borderRadius: 25,
//    padding: 10,
// },
// buttonText: {
//    color: '#fff',
//    fontWeight: 'bold',
//    textAlign: 'center',
// },
//  forgotButton: {
//   marginBottom: 10,
//     padding:0,
//  },
//  forgotButtonText: {
//    color: 'red',
  
// },
// otherlogin:{
//    alignItems:'center',
//    justifyContent:'flex-start',
//    paddingBottom:400
// }
// });

// export default Login;




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin=()=>{

  }
  return (
     <View style={styles.container}>
       <View style={styles.background}>
         <View style={styles.triangle}>
           <Text style={styles.loginText}>Login</Text>
         </View>
       </View>
       <View style={styles.back}>
         {/* <View style={styles.icon}>
         <MaterialIcons name='alternate-email' style={styles.Iconname} />
      <TextInput
        style={styles.input}
        placeholder="Email" 
        styles={{flex:1}}
        value={email}
        onChangeText={setEmail}
      />
      </View>
       <View style={styles.icon}>
       <Ionicons name='ios-lock-closed-outline'  style={styles.Iconname}/>
      <TextInput
      
        style={styles.input}
        placeholder="Password"
        styles={{ flex: 1, paddingVertical: 0 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
         
         <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.forgottext}>Forot?</Text>
         </TouchableOpacity>
         </View> */}
          <View style={styles.icon1}>
          <MaterialIcons name='alternate-email' style={styles.Iconname} />
          <TextInput placeholder="Username" style={{ flex: 1 }} />
        </View>
        <View style={styles.icon2}>
          <Ionicons name='ios-lock-closed-outline' style={styles.Iconname} />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
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
     backgroundColor: 'skyblue',
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
     borderLeftWidth: 215,
     borderRightWidth: 215,
     borderBottomWidth: 250,
     borderLeftColor: 'transparent',
     borderRightColor: 'transparent',
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
    paddingVertical:40,
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
  width:'80%',
  backgroundColor: 'purple',
  padding: 20,
  borderRadius: 5,
  
},
buttontext: {
  textAlign: 'center',
  fontWeight: '700',
  fontSize: 16,
  color: 'white',
},
otherlogin:{
  textAlign: 'center',
   marginBottom: 30, 
   color: 'black',
   paddingVertical:25,
   fontSize:15,
}
 
 });
 
 export default Login;