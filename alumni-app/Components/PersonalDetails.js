import React from "react"
import { Text,View,StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { login } from "../api_manager/Login_API";

const PersonalDetails=()=>{
    return(
                
        <View style={{bottom:0}}> 
        <View style={styles.personaldetails}>
        <Icon name="phone" size={24} color="green" />
        <Text style={{fontSize:24}}>  : </Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}>MobileNumber</Text>
        </View>
        <View style={styles.personaldetails}>
        <Icon name="envelope" size={24} color="blue" />
        <Text style={{fontSize:24}}> : </Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}>MailId  </Text>
        </View>
        <View style={styles.personaldetails}>
        <Icon name="calendar" size={24} color="black" />
        <Text style={{fontSize:24}}> : </Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Date of Birth  </Text>
        </View>
        <View style={styles.personaldetails}>
        <Icon name="tint" size={24} color="red" />
        <Text style={{fontSize:24}}>  : </Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Blood Group  </Text>
        </View>
        <View style={{...styles.personaldetails, borderBottomWidth: 3}}>
        <Icon1 name="map-marker" size={24} color="brown" />
        <Text style={{fontSize: 24}}>  : </Text>
        <Text style={{fontSize: 20, paddingVertical: 5,fontWeight:'bold'}}>City,State,Country,Pincode</Text>
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
      },

    })