import React ,{useState}from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import Header from "../Components/Header";
import Footer from "../Components/Footer"
import Follow from '../Components/Follow';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
import PersonalDetails from '../Components/PersonalDetails';
import Imagesetup from '../Components/Imagesetup';
import Skillset from '../Components/skillset';
import Experience from '../Components/Experienceset';
import User from '../Components/username'
const Profile=()=>{
  return( 
    <View style={styles.container}>
        <Header/>
        <View style={{flex:10}}>
        <ScrollView style={styles.background}>
            <Imagesetup/>
            <Follow/>
            <User/>
            <PersonalDetails/>
            <Skillset/>
            <Experience/>
        </ScrollView>
        </View>
        <Footer/>
      </View>
  )
}

export default Profile

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  background:{
    backgroundColor:'white',
  },
username:{
  textAlign:'center',
  fontWeight:'700',
  fontSize:18,
  left:60,
  bottom:60,
},
})