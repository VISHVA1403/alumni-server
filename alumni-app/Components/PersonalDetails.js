import React from "react"
import { Text,View,StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { login } from "../api_manager/Login_API";

const PersonalDetails=()=>{
    return(
                
        <View style={{paddingVertical:10}}>
        <View style={styles.personaldetails}>
        <Icon name="phone" size={24} color="black" />
        <Text style={{fontSize:24}}> :</Text>
        <Text style={{fontSize:24}}>MobileNumber</Text>
        </View>
        <View style={styles.personaldetails}>
        <Icon name="envelope" size={24} color="black" />
        <Text style={{fontSize:24}}> :</Text>
        <Text style={{fontSize:24}}>MailId  </Text>
        </View>
        <View style={styles.personaldetails}>
        <Icon name="calendar" size={24} color="black" />
        <Text style={{fontSize:24}}> :</Text>
        <Text style={{fontSize:24}}>Date of Birth  </Text>
        </View>
        <View style={styles.personaldetails}>
        <Icon name="tint" size={24} color="red" />
        <Text style={{fontSize:24}}> :</Text>
        <Text style={{fontSize:24}}>Blood Group  </Text>
        </View>
        <View style={{...styles.personaldetails, borderBottomWidth: 3}}>
        <Icon1 name="map-marker" size={24} color="red" />
        <Text style={{fontSize: 24}}> :</Text>
        <Text style={{fontSize: 24, paddingVertical: 5}}>City,State,Country,Pincode</Text>
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