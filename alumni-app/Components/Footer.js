import React from "react";
import { SafeAreaView, Text ,View,StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


const Footer=()=>{
    const navigation=useNavigation()
    const handleHome=()=>{
        navigation.navigate('Home');
    }
    const handleSearch=()=>{
        navigation.navigate('Home');
    }
    const handlePost=()=>{
        navigation.navigate('Home');
    }
    const handleNotifications=()=>{
        navigation.navigate('Home');
    }
    const handleProfile=()=>{
        navigation.navigate('Profile');
    }
    return(
        <View style={styles.footer}>
        <TouchableOpacity onPress={handleHome}>
        <MaterialIcons name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearch}>
        <MaterialIcons name="search" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
        <MaterialIcons name="add-box" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotifications}>
        <MaterialIcons name="notifications" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfile}>
        <MaterialIcons name="account-circle" size={30} color="black" />
        </TouchableOpacity>
        </View>
        
    )
}



styles=StyleSheet.create({
    footer:{
        flex:1,
        backgroundColor:'wheat',
        flexDirection:'row',
         alignItems:'center',
        justifyContent:'space-evenly'
    },
   
})

export default Footer