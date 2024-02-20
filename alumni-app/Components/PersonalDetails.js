import React ,{useState,useEffect,useRef}from "react"
import { Text,View,StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {fetchUserProfile} from "../api_manager/UserProfile"
import {Ionicons} from '@expo/vector-icons'
import {font} from 'expo'
import * as Font from 'expo-font'
import axios from "axios";
const PersonalDetails=()=>{
        const [userDetails, setUserDetails] = useState(null);
        const [fontLoaded, setFontLoaded] = useState(false);
        useEffect(() => {
          const fetchUserProfileData = async () => {
            try {
              const userProfileData = await fetchUserProfile();
            //  console.log(userProfileData)
              setUserDetails(userProfileData);} catch (error) {
              console.error('Error fetching user profile data:', error);}
          };
          fetchUserProfileData();
        }, []);
    return(       
        <View style={{bottom:0}}> 
        <View style={{backgroundColor:'#F6F6F6',flex:2}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>About...</Text>
        </View>
        <View style={styles.personaldetails}>
        {/* <Icon name="phone" size={24} color="green" /> */}
        <Text style={{fontSize:20,fontWeight:'bold'}}>  contact:</Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}> {userDetails?.contactNumber || "null"}</Text>
        </View>
        <View style={styles.personaldetails}>
        {/* <Icon name="envelope" size={24} color="blue" /> */}
        <Text style={{fontSize:20,fontWeight:'bold'}}>  mailid:</Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}> mailId</Text>
        </View>
        <View style={styles.personaldetails}>
        {/* <Icon name="calendar" size={24} color="black" /> */}
        <Text style={{fontSize:20,fontWeight:'bold'}}>  Dateofbirth:</Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}> Date of Birth</Text>
        </View>
        <View style={styles.personaldetails}>
        {/* <Icon name="tint" size={24} color="red" /> */}
        <Text style={{fontSize:20,fontWeight:'bold'}}>  BloodGroup: </Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{userDetails?.bloodGroup || "null"}  </Text>
        </View>
        <View style={styles.personaldetails}>
        {/* <Icon1 name="map-marker" size={24} color="brown" /> */}
        <Text style={{fontSize: 20, paddingVertical: 5,fontWeight:'bold'}}>   {userDetails?.city || "null"},{userDetails?.state || "null"},{userDetails?.country || "null"},{userDetails?.pincode || "null"}</Text>
        </View>
        </View>
    )
}


export default PersonalDetails

const styles=StyleSheet.create({
    personaldetails:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:5, 
       // fontFamily: 'Poppins Black',
      },

    })