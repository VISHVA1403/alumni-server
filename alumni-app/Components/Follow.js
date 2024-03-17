import React from "react"
import {Text,View,StyleSheet} from 'react-native'


const Follow=()=>{
    return(
        <View style={{flexDirection:'row',left:130,top:20}}>
        <Text style={styles.username}>Following</Text>
        <View style={{left:30}}>
        <Text style={styles.username}>Followers</Text></View>
        <View style={{bottom:85,right:75}}><Text style={{fontSize:20,fontWeight:'500'}}>100</Text></View>
        <View style={{bottom:85,right:5}}><Text style={{fontSize:20,fontWeight:'500'}}>100</Text></View>
        </View>
    )
}
export default Follow;

const styles=StyleSheet.create({
    username:{
        textAlign:'center',
        fontWeight:'700',
        fontSize:18,
        left:60,
        bottom:60,
      },
})