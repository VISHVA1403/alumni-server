import React ,{useState}from "react";
import { Text,View,StyleSheet ,TouchableOpacity,Modal,TextInput,Button,FlatList} from "react-native";
import Icon1 from 'react-native-vector-icons/MaterialIcons';
const Skillset=()=>{

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

    return(
        <View style={{borderBottomWidth:3,width:'100%'}}>
        <View style={styles.title}>
        <Text style={styles.titletext}>Skill Set:</Text>
        <TouchableOpacity onPress={() => setShowSkillModal(true)}>
          <Text style={styles.editButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'column'}}>
        {skills.map((skill, index1) => (
          <View key={index1} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>
            <Text style={{fontSize:20,flex:1}}>{skill.course}</Text>
            <Text style={{fontSize:20,flex:1}}>{skill.level}</Text>
            <Text style={{fontSize:20,flex:1}}>{skill.certified}</Text>
            <TouchableOpacity onPress={() => handleDeleteSkill(index1)}>
              <Icon1 name="delete" size={24}/>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      


<Modal
        animationType='slide'
        transparent={true}
        visible={showSkillModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <TextInput
              style={{fontSize:16}}
              placeholder="Skill"
              value={newSkill.course}
              onChangeText={(text) => setNewSkill({ ...newSkill, course: text })}
            />
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <TextInput
              placeholder="Level"
              value={newSkill.level}
              onChangeText={(text) => setNewSkill({ ...newSkill, level: text })}
            />
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <TextInput
              placeholder="Certified/UnCertified"
              value={newSkill.certified}
              onChangeText={(text) => setNewSkill({ ...newSkill, certified: text })}
            />
            </View>
            <Button title="Save" onPress={handleSaveSkill} />
            <Button title="Cancel" onPress={handleCloseSkill} />
          </View>
        </View>
      </Modal>

      </View>
    )
}

const styles=StyleSheet.create({
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
      editButtonText: {
        color: 'blue',
        fontSize:15,
        fontWeight:'800',
        right:0,
    },
    skillview:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
     // borderBottomWidth:1,
      //width:'100%',
      paddingVertical:10,
     // borderBottomWidth:2,
    },
    skillRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    //  borderBottomWidth: 2,
     // paddingVertical: 10,
    },
    skillItem: {
      flex: 1,
      fontSize: 20,
    },
})

export default Skillset