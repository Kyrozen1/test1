import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

export default class List extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <SafeAreaView/>
        <View>
          <Text style={styles.titleText}>Agenda</Text>
        </View>
        <View style={{marginTop:20}}>
          <Text> English HW</Text>
          <Text> Chinese HW</Text>
          <Text> Math Revision</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.text}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  titleText:{
    fontSize:35,
    fontWeight:'bold',
    color:'purple',
  },
  addButton:{
    marginTop:50,
    width:100,
    height:40,
    backgroundColor:"red",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  text:{
    color:'white',
    fontSize:15,
    fontWeight:'bold',
  }
})