import React from "react";
import { SafeAreaView, Text ,View,StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';


const Header=()=>{
    return(
        <View style={styles.header}>
            <View style={{left:350}}>
            <TouchableOpacity onPress={true}>
            <Icon name="power-off" size={30} color="red" />
            </TouchableOpacity>
            </View>
            </View>
    )
}

export default Header;

styles=StyleSheet.create({
    header:{
        backgroundColor:'skyblue',
        flexDirection:'row',
        flex:0.5,
    }
})