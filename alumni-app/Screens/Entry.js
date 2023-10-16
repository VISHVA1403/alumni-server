import React , { useEffect }from "react";
import { SafeAreaView, Text ,View,StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


const Entry=()=>{
  const navigation = useNavigation();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
    return(
        <View style={styles.entry}>
            <Text style={{fontSize:40,alignItems:'center',justifyContent:'center'}}>Welcome to Kit</Text>
            </View>
    )
}

export default Entry;

styles=StyleSheet.create({
    entry:{
        flex:1,
        backgroundColor:'wheat',
    }
})