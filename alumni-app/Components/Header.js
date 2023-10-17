import React from "react";
import { SafeAreaView, Text ,View,StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


const Header=()=>{
    return(
        <View style={styles.header}>
            <MaterialIcons name="dashboard" size={30} color="black" />
            </View>
    )
}

export default Header;

styles=StyleSheet.create({
    header:{
        backgroundColor:'wheat',
        flexDirection:'row',
        flex:0.5,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    }
})