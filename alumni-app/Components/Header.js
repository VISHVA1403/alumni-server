import React from "react";
import { SafeAreaView, Text ,View,StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


const Header=()=>{
    return(
        <View style={styles.header}>
            <MaterialIcons name="power-settings-new" size={30} color="black" />
            </View>
    )
}

export default Header;

styles=StyleSheet.create({
    header:{
        flex:1,
        backgroundColor:'wheat',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        right:20,
        flexDirection:'row'
    }
})