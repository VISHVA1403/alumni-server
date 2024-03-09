import React ,{useState,useEffect}from 'react'      
import { Text,View,StyleSheet,Image,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {fetchUserProfile} from "../api_manager/UserProfile"
const Imagesetup=()=>{

  const [userDetails, setUserDetails] = useState(null);
      
        useEffect(() => {
          const fetchUserProfileData = async () => {
            try {
              const userProfileData = await fetchUserProfile();
              //console.log(userProfileData)
              setUserDetails(userProfileData);
            } catch (error) {
              console.error('Error fetching user profile data:', error);
            }
          };
      
          fetchUserProfileData();
          console.log('Cover Photo URL:', userDetails?.profilePhoto);
        }, []);

        const serverBaseUrl = ' http://127.0.0.1:8000/';
    return(
      <View>
        
      <Image 
      source={require('../images/coverphoto.jpg')}
      style={styles.coverphoto}
      />
      <Image 
    //  source={{ uri: userDetails?.profilePicture || 'https://example.com/defaultCoverPhoto.jpg' }}
      source={{ uri: `${serverBaseUrl}${userDetails?.profilePicture}` }}
      style={styles.profilephoto}
      />
      <TouchableOpacity onPress={true}>
      <MaterialIcons name='circle-notifications' size={25} color='white' style={{left:340,bottom:170}}/>
      </TouchableOpacity>
       <TouchableOpacity
      style={styles.editButton}
      onPress={true}
    >
      <Text style={styles.editButtonText}>Profile</Text>
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
    width:130, 
    height: 130,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    top:120,
    left:10,

  },
  editButton: {
   position: 'relative',
   bottom: 220, 
   alignSelf: 'center',
   padding: 10,
   left:180,
   
 },
 editButtonText: {
   color: 'white',
   fontSize:20,
   right:200,
   fontWeight:'bold',
   top:20,
   right:180, 
   //fontFamily:'poppins',         
      },

        })