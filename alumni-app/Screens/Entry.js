import React , { useEffect }from "react";
import { SafeAreaView, Text ,View,StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


const Entry=()=>{
  const navigation = useNavigation();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);
    return(
        <View style={styles.entry}>
            <Text style={{fontSize:25,color:'black',fontWeight:'800'}}>Karpagam Institute of Technology</Text>
            </View>
    )
}

export default Entry;

styles=StyleSheet.create({
    entry:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',justifyContent:'center'
    }
})