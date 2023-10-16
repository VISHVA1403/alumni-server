import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import Header from "../Components/Header";
import Footer from "../Components/Footer"
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
import changeProfile from './changeprofile';

const Profile=()=>{
  const navigation=useNavigation()
  const handleLogin=()=>{
      navigation.navigate(Home);
  }
  return(
    
    <View style={styles.container}>
        <Header/>
        <View style={{flex:10}}>
        <ScrollView style={styles.background}>
          <View>
          <Image 
          source={require('../images/coverphoto.jpg')}
          style={styles.coverphoto}
          />
          
          <Image 
          source={require('../images/profilephoto.jpg')}
          style={styles.profilephoto}
          />
          <TouchableOpacity onPress={handleLogin}>
          <Icon name='camera' size={30} color='black' style={{left:120,top:40}}/>
          </TouchableOpacity>
           <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
          }}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.username}>USERNAME</Text>
        <View style={styles.buttonview}>
        <TouchableOpacity 
        onPress={true}
        style={styles.button}
        ><Text style={{color:'white'}}>Add Post</Text></TouchableOpacity>
        <TouchableOpacity 
        onPress={handleLogin}
        style={styles.button}
        ><Text style={{color:'white'}}>EditProfile</Text></TouchableOpacity>
        </View>
        <View style={styles.title}>
        <Text style={styles.titletext}>Personal Details:</Text>
        {/* <TouchableOpacity
          onPress={true}>
            <Text style={styles.editButtonText}>Edit</Text></TouchableOpacity> */}
        </View>
        <View style={{paddingVertical:10}}>
        <View style={styles.personaldetails}>
        <Text style={{fontSize:24}}>MobileNumber </Text>
        <Icon name="phone" size={24} color="black" />
        <Text style={{fontSize:24}}> :</Text>
        </View>
        <View style={styles.personaldetails}>
        <Text style={{fontSize:24}}>MailId  </Text>
        <Icon name="envelope" size={24} color="yellow" />
        <Text style={{fontSize:24}}> :</Text>
        </View>
        <View style={styles.personaldetails}>
        <Text style={{fontSize:24}}>Date of Birth  </Text>
        <Icon name="calendar" size={24} color="black" />
        <Text style={{fontSize:24}}> :</Text>
        </View>
        <View style={styles.personaldetails}>
        <Text style={{fontSize:24}}>Blood Group  </Text>
        <Icon name="tint" size={24} color="red" />
        <Text style={{fontSize:24}}> :</Text>
        </View>
        <View style={styles.personaldetails}>
        <Text style={{fontSize:24,borderBottomWidth:1,width:'100%',paddingVertical:10}}>Register Number  </Text>
        <MaterialIcons name="perm-identity" size={24} color="red" />
        <Text style={{fontSize:24}}> :</Text>
        </View>
        </View>
        <View style={styles.title}>
        <Text style={styles.titletext}>Skill Set</Text>
        <TouchableOpacity
          onPress={true}>
            <Text style={styles.editButtonText}>Add</Text></TouchableOpacity>
        </View>
        <View style={styles.skillview}>
          <TextInput  placeholder='Skill' style={{fontSize:24,fontWeight:'500'}}/>
          <TextInput  placeholder='level'style={{fontSize:24,fontWeight:'500'}}/>
          <TextInput  placeholder='certified' style={{fontSize:24,fontWeight:'500'}}/>
          <TouchableOpacity onPress={true} >
            <Icon name="plus" size={24} color="red"/>
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
        <Text style={styles.titletext}>Experience</Text>
        <TouchableOpacity
          onPress={true}>
            <Text style={styles.editButtonText}>Add</Text></TouchableOpacity>
        </View>
        <View style={styles.experienceview}>
        <TextInput  placeholder='Organisation:' style={{fontSize:24,fontWeight:'500'}}/>
          <TextInput  placeholder='Domain:'style={{fontSize:24,fontWeight:'500'}}/>
          <TextInput  placeholder='Location:'style={{fontSize:24,fontWeight:'500'}}/>
          <TextInput  placeholder='Period:' style={{fontSize:24,fontWeight:'500'}}/>
          {/* <TouchableOpacity onPress={true} >
            <Icon name="plus" size={24} color="red"/>
          </TouchableOpacity> */}
        </View>
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
   backgroundColor:'wheat',
  },
  background:{
  //  flex:1,
    backgroundColor:'tan',
  },
  coverphoto:{
     resizeMode:'stretch',
      width:'100%',
      height:200,
  },
  profilephoto: {
    width:150, 
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'red',
    position: 'absolute',
    bottom:0,
  },
  editButton: {
    position: 'relative',
    bottom: 220, 
    alignSelf: 'center',
    padding: 10,
    left:180,
  },
  editButtonText: {
    color: 'blue',
    fontSize:20,
    
},
username:{
  textAlign:'center',
  fontWeight:'700',
  fontSize:25,
  left:60,
  bottom:60,
},
title:{
  
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'flex-end',
  
},
titletext:{
  fontSize:24,
  fontWeight:'bold',
  borderBottomWidth:3,
},
buttonview:{
  flexDirection:'row',
  height:40,
  width:'100%',
  borderRadius:5,
  bottom:20,
},
button:{
  alignItems:'centre',
  backgroundColor:'purple',
  width:'50%',
  alignItems:'center',
  justifyContent:'center' 
},
personaldetails:{
  flexDirection:'row',
  alignItems:'center',
  paddingVertical:5, 
},
skillview:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  borderBottomWidth:1,
  width:'100%',
  paddingVertical:10,
  borderBottomWidth:2,
},
experienceview:{
  justifyContent:'space-between',
  borderBottomWidth:1,
  width:'100%',
  paddingVertical:10,
  borderBottomWidth:2,
},
})