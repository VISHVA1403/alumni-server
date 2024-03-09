import React from "react";
import { Text,View,StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditProfile from "../Screens/editProfile";
import { getTokenFromStorage } from "../Screens/auth";
import uname from "../Screens/Login"
import { useState , useEffect} from "react";
import {fetchUserProfile} from "../api_manager/UserProfile"
const User=()=>{
    const navigation=useNavigation()
    const editProfile=()=>{
        navigation.navigate(EditProfile)
    }
    const [userDetails, setUserDetails] = useState(null);
        useEffect(() => {
          const fetchUserProfileData = async () => {
            try {
              const userProfileData = await fetchUserProfile();
              console.log(userProfileData)
              setUserDetails(userProfileData);} catch (error) {
              console.error('Error fetching user profile data:', error);}
          };
          fetchUserProfileData();
        }, []);
    return(
        <View style={{flexDirection:'row',bottom:20,left:30}}>
        <Text style={{fontSize:15,fontWeight:'900'}}>{userDetails?.user.username|| "null"}</Text>
        <TouchableOpacity 
        onPress={editProfile}
        style={styles.button}
        ><Text style={{color:'white'}}>Edit Profile</Text></TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    button:{
        alignItems:'centre',
        backgroundColor:'black',
        width:'35%',
        alignItems:'center',
        justifyContent:'center',
        left:100,
        top:0,
        //borderRadius: 20,
      },
})

export default User