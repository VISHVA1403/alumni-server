import React from "react";
import { SafeAreaView, Text ,View,StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";
import Footer from "../Components/Footer"
const Home = () => {
   
    return (
        <SafeAreaView style={styles.container}>
            <Header/>
            <View style={styles.other}>
            </View>
              
               <Footer/> 
        </SafeAreaView>
    );
}

export default Home;
 
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    other:{
        flex:10,
        backgroundColor:'white',
    },
    
    
})