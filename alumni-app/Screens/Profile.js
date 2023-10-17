import React ,{useState}from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import Header from "../Components/Header";
import Footer from "../Components/Footer"
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
import { Modal } from 'react-native';
import PersonalDetails from '../Components/PersonalDetails';

const Profile=()=>{
 
//---------------------------------------------SKILL MODAL--------------------------------------------------------------
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ course: '', level: '', certified: '' });

  const handleSaveSkill = () => {
    if (newSkill.course && newSkill.level && newSkill.certified) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill({ course: '', level: '', certified: '' });
    setShowSkillModal(false);
  };
  const handleDeleteSkill = (index1) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index1, 1);
    setSkills(updatedSkills);
  };
  const handleCloseSkill=()=>{
    setNewSkill({ course: '', level: '', certified: '' }); 
    setShowSkillModal(false);
  }
//----------------------------------------------EXPERIENCE MODAL_-----------------------------------------------------------------
const [showExperience, setShowExperience] = useState(false);
  const [experience, setExperience] = useState([]);
  const [newExperience, setNewExperience] = useState({ Organisation: '', Domain: '', Location: '', Period: '' });

  const handleSaveExperience = () => {
    if (newExperience.Organisation && newExperience.Domain && newExperience.Location && newExperience.Period) {
      setExperience([...experience, newExperience]);
      setNewExperience({ Organisation: '', Domain: '', Location: '', Period: '' });
      setShowExperience(false);
    }
  };

  const handleDeleteExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleCloseExperience = () => {
    setNewExperience({ Organisation: '', Domain: '', Location: '', Period: '' });
    setShowExperience(false);
  };
//---------------------------------------------------------------------------------------------------------------------------------------
  return( 
    <View style={styles.container}>
        <Header/>
        <View style={{flex:10}}>
        <ScrollView style={styles.background}>
  {/* --------------------------------------COVER AND PROFILE PHOTO------------------------------------------------------------- */}
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
          <Icon name='camera' size={30} color='black' style={{left:130,bottom:10}}/>
          </TouchableOpacity>
           {/* <TouchableOpacity
          style={styles.editButton}
          onPress={true}
        >
          <Text style={styles.editButtonText}>Edit</Text>
  </TouchableOpacity>*/}
        
        <View style={{flexDirection:'row',left:120,top:60}}>
          
        <Text style={styles.username}>Following</Text>
        <View style={{left:30}}>
        <Text style={styles.username}>Followers</Text></View>
        </View>
        </View> 
        {/* <View style={styles.buttonview}>
        <TouchableOpacity 
        onPress={true}
        style={styles.button}
        ><Text style={{color:'white'}}>Add Post</Text></TouchableOpacity>
        <TouchableOpacity 
        onPress={true}
        style={styles.button}
        ><Text style={{color:'white'}}>EditProfile</Text></TouchableOpacity>
        </View> */}
        <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:25}}>@USERNAME</Text>
        <TouchableOpacity 
        onPress={true}
        style={styles.button}
        ><Text style={{color:'white'}}>Edit Profile</Text></TouchableOpacity>
        </View>
        <PersonalDetails/>
{/*- ----------------------------------------SKILLSET-------------------------------------------------------------------------------- */}
        <View style={styles.title}>
            <Text style={styles.titletext}>Skill Set:</Text>
            <TouchableOpacity onPress={() => setShowSkillModal(true)}>
              <Text style={styles.editButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'column',borderBottomWidth:3,}}>
            {skills.map((skill, index1) => (
              <View key={index1} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>
                <Text style={{fontSize:20}}>{skill.course}</Text>
                <Text style={{fontSize:20}}>{skill.level}</Text>
                <Text style={{fontSize:20}}>{skill.certified}</Text>
                <TouchableOpacity onPress={() => handleDeleteSkill(index1)}>
                  <Icon1 name="delete" size={24}/>
                </TouchableOpacity>
              </View>
            ))}
          </View>
{/*- ----------------------------------------EXPERIENCE-------------------------------------------------------------------------------- */}
<View style={styles.title}>
          <Text style={styles.titletext}>Experience:</Text>
          <TouchableOpacity onPress={() => setShowExperience(true)}>
            <Text style={styles.editButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', borderBottomWidth: 3 }}>
          {experience.map((exp, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 20 }}>{exp.Organisation}</Text>
              <Text style={{ fontSize: 20 }}>{exp.Domain}</Text>
              <Text style={{ fontSize: 20 }}>{exp.Location}</Text>
              <Text style={{ fontSize: 20 }}>{exp.Period}</Text>
              <TouchableOpacity onPress={() => handleDeleteExperience(index)}>
                <Icon1 name="delete" size={24} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.buttonview1}>
        <TouchableOpacity 
        onPress={true}
        style={styles.button}
        ><Text style={{color:'white'}}>My Post</Text></TouchableOpacity>
        <TouchableOpacity 
        onPress={true}
        style={styles.button}
        ><Text style={{color:'white'}}>Tag</Text></TouchableOpacity>
     </View>  
      
        </ScrollView>
        </View>
        <Footer/>
  {/* --------------------------------------------MODAL FOR SKILLSET------------------------------------------------- */}
        <Modal
        animationType='slide'
        transparent={true}
        visible={showSkillModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Skill:</Text>
            <TextInput
              style={{fontSize:16}}
              placeholder=""
              value={newSkill.course}
              onChangeText={(text) => setNewSkill({ ...newSkill, course: text })}
            />
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Level:</Text>
            <TextInput
              placeholder=""
              value={newSkill.level}
              onChangeText={(text) => setNewSkill({ ...newSkill, level: text })}
            />
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Certified/UnCertified:</Text>
            <TextInput
              placeholder=""
              value={newSkill.certified}
              onChangeText={(text) => setNewSkill({ ...newSkill, certified: text })}
            />
            </View>
            <Button title="Save" onPress={handleSaveSkill} />
            <Button title="Cancel" onPress={handleCloseSkill} />
          </View>
        </View>
      </Modal>
    {/* ----------------------------------MODAL FOR EXPERIENCE----------------------------------------------------- */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={showExperience}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder='Organisation'
              value={newExperience.Organisation}
              onChangeText={(text) => setNewExperience({ ...newExperience, Organisation: text })}
            />
            <TextInput
              placeholder='Domain'
              value={newExperience.Domain}
              onChangeText={(text) => setNewExperience({ ...newExperience, Domain: text })}
            />
            <TextInput
              placeholder='Location'
              value={newExperience.Location}
              onChangeText={(text) => setNewExperience({ ...newExperience, Location: text })}
            />
            <TextInput
              placeholder='Period'
              value={newExperience.Period}
              onChangeText={(text) => setNewExperience({ ...newExperience, Period: text })}
            />
            <Button title="Save" onPress={handleSaveExperience} />
            <Button title="Cancel" onPress={handleCloseExperience} />
          </View>
        </View>
      </Modal>
      </View>
      
 
    
  
  )
}

export default Profile

const styles=StyleSheet.create({
  container:{
    flex:1,
   backgroundColor:'white',
  },
  background:{
  //  flex:1,
    backgroundColor:'white',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
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
  fontSize:18,
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
  height:30,
  width:'100%',
  borderRadius:5,
  bottom:20,
},
buttonview1:{
  flexDirection:'row',
  height:40,
  width:'100%',
  borderRadius:5,
  
},
button:{
  alignItems:'centre',
  backgroundColor:'blue',
  width:'40%',
  alignItems:'center',
  justifyContent:'center',
  left:40,
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