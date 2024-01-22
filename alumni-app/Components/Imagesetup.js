import React from 'react'      
import { Text,View,StyleSheet,Image,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const Imagesetup=()=>{
    return(
      <View>
      <Image 
      source={require('../images/coverphoto.jpg')}
      style={styles.coverphoto}
      />
      <Image 
      source={require('../images/profilephoto.jpg')}
      style={styles.profilephoto}
      />
      <TouchableOpacity onPress={true}>
      <Icon name='camera' size={25} color='black' style={{left:60,top:25}}/>
      </TouchableOpacity>
       <TouchableOpacity
      style={styles.editButton}
      onPress={true}
    >
      <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
           
    
            </View> 
           
  )
}
 export default Imagesetup

 const styles=StyleSheet.create({
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
    bottom:30,
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
   right:40,
          
      },

        })