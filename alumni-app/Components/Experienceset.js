import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { getTokenFromStorage } from '../Screens/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchUserExperience } from '../api_manager/UserExperience';
import { useNavigation } from '@react-navigation/native';
import ShowExperience from '../Screens/ShowExperience';
import url from '../Screens/Entry'
import { Alert } from 'react-native';
const Experience = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [designation, setDesignation] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [FromDate, setFromDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigation=useNavigation()
  
  
  const showExp=()=>{
    navigation.navigate(ShowExperience)
  }

  const handleSubmit = async () => {
    try {
      const token = await getTokenFromStorage();
      const response = await fetch(' http://127.0.0.1:8000/alumni/experiences/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, 
        },
        body: JSON.stringify({
          designation,
          companyName,
          FromDate,
          EndDate,
        }),
      });

      if (response.ok) {
        console.log('Experience added successfully');
        setDesignation('');
        setcompanyName('');
        setFromDate('');
        setEndDate('');
        setShowInputs(false);
        setSuccessMessage('Experience added successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      } else {
        console.error('Failed to add experience. Check the API response.');
      }
    } catch (error) {
      console.error('An error occurred while adding experience:', error);
    }
  };
  const handleCancel = () => {
    setShowInputs(false);
    setDesignation('');
    setcompanyName('');
    setFromDate('');
    setEndDate('');
  };

  return (

    <View style={styles.container}>
      <View style={{ flexDirection: 'row',backgroundColor:'#F6F6F6' }}>
        <TouchableOpacity  onPress={showExp} >
         <Text style={{ fontWeight: 'bold', fontSize: 20,right:10,bottom:10 }}>EXPERIENCE</Text>
          </TouchableOpacity>
          {showInputs ? (
          <TouchableOpacity onPress={handleCancel}>
            <View style={{right:25}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, left: 220, color: 'red', bottom: 10 }}>Cancel</Text></View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowInputs(true)}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, left: 220, color: 'blue', bottom: 10 }}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
      {successMessage !== '' && (
        <View style={styles.successMessage}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</Text>
        </View>
      )}



    {showInputs && (
      <View>
      <Text>Designation:</Text>
      <TextInput
        style={styles.input}
        value={designation}
        onChangeText={setDesignation}
        placeholder='SENIOR DEVELOPER'
      />

      <Text>companyName:</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={setcompanyName}
        placeholder='HCL'
      />

      <Text>From Date:</Text>
      <TextInput
        style={styles.input}
        value={FromDate}
        onChangeText={setFromDate}
        placeholder='YYYY-MM-DD'
      />

      <Text>To Date:</Text>
      <TextInput style={styles.input} value={EndDate} onChangeText={setEndDate} placeholder='YYYY-MM-DD' />

      <Button title="Add Experience" onPress={handleSubmit} />
      </View>
    )}
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    position: 'relative', 
    backgroundColor:'#F6F6F6',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  successMessage: {
    backgroundColor: 'lightgreen',
    padding: 8,
    marginTop: 0, 
    position: 'absolute', 
    width: '80%', 
    bottom:550,
  },
});

export default Experience;
