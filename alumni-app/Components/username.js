import React from "react";
import { Text,View,StyleSheet,TouchableOpacity } from "react-native";

const User=()=>{
    return(
        <View style={{flexDirection:'row',bottom:30,left:20}}>
        <Text style={{fontSize:20,fontWeight:'900'}}>@USERNAME</Text>
        <TouchableOpacity 
        onPress={true}
        style={styles.button}
        ><Text style={{color:'white'}}>Edit Profile</Text></TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    button:{
        alignItems:'centre',
        backgroundColor:'blue',
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        left:40,
      },
})

export default User