import React ,{useState}from "react";
import { Text, View, SafeAreaView, Button, TouchableOpacity, Image, TextInput, ImageBackground ,StyleSheet,Alert} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import  login  from "../Screens/Login_API";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
    const result = await login(username, password);

    if (result.success) {
      Alert.alert("Login Successful", result.message);
    } else {
      Alert.alert("Login Failed", result.message);
    }
  };
  return (
    <View style={Styles.Container}>
        <View style={{paddingHorizontal:30}}>
        <View style={{alignItems:'center'}}>
      <Image style={Styles.Image}
      source={{uri:'https://www.shutterstock.com/image-vector/alumni-vector-lettering-illustration-on-260nw-1068935519.jpg'}}
        />
    </View>
    <Text style={Styles.Logintext}>Login </Text>
    
    <View style={Styles.icon}>
        <MaterialIcons name='alternate-email' style={Styles.Iconname}/>
        <TextInput placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
         style={{flex:1}}/>
    </View>
    <View style={Styles.icon}>
        <Ionicons name='ios-lock-closed-outline'  style={Styles.Iconname}/>
        <TextInput 
            placeholder="Password" 
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{flex:1,paddingVertical:0}}
            secureTextEntry={true}
            />
            
        <TouchableOpacity onPress={()=>{}}>
            <Text style={{color:'blue',fontWeight:'700',textAlign:'center'}}>Forget?</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin}style={Styles.Button}>
            <Text style={Styles.LoginButtonText}>Login</Text>
        </TouchableOpacity>
    <Text style={{textAlign:'center',marginBottom:30,color:'black'}}>or,login with...</Text>
  
    </View>
    </View>
  );
};

export default Login;


const Styles=StyleSheet.create({

    Container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'white',
    },
    Logintext:{
        fontSize:25,
        fontWeight:"bold",
        marginBottom:30,
    },
    Image:{
        height:300,
        width:300,
        transform:[{rotate:'-15deg'}],
    },
    icon:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        paddingBottom:8,
        marginBottom:25,
        borderBottomColor:'gray'
    },
    Iconname:{
        fontSize:20,
        marginRight:5,
    },
    Button:{
        backgroundColor:'purple',
        padding:20,
        borderRadius:10,
        marginBottom:30,
    },
    LoginButtonText:{
        textAlign:'center',
        fontWeight:'700',
        fontSize:16,
        color:'white',
    }
})




