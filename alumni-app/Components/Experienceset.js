import React,{useState} from "react";
import { Text,View,Button,TouchableOpacity,StyleSheet,Modal,TextInput ,FlatList} from "react-native";
import Icon1 from 'react-native-vector-icons/MaterialIcons';


const Experience=()=>{

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

    return(
        <View>
        <View style={styles.title}>
          <Text style={styles.titletext}>Experience:</Text>
          <TouchableOpacity onPress={() => setShowExperience(true)}>
            <Text style={styles.editButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', borderBottomWidth: 3 }}>
          {experience.map((exp, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 20 , flex:1 }}>{exp.Organisation}</Text>
              <Text style={{ fontSize: 20 , flex:1 }}>{exp.Domain}</Text>
              <Text style={{ fontSize: 20 , flex:1  }}>{exp.Location}</Text>
              <Text style={{ fontSize: 20 , flex:1 }}>{exp.Period}</Text>
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
export default Experience

const styles=StyleSheet.create({
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
        fontSize:15,
        right:0,
        fontWeight:'800',
        
    },
    title:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        paddingVertical:5,
      },
      titletext:{
        fontSize:20,
        fontWeight:'900',
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
      experienceview:{
        justifyContent:'space-between',
       borderBottomWidth:1,
        width:'100%',
        //paddingVertical:10,
        borderBottomWidth:2,
      },
      experienceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 3,
        //paddingVertical: 10,
      },
      experienceItem: {
        flex: 1,
        fontSize: 20,
      },
})