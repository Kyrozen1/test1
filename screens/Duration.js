import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default class Duration extends React.Component{
  render(){
    return(
      <View>
        <SafeAreaView/>
        <View style={{marginLeft:20}}>
          <Text style={styles.titleText}>Set Timer</Text>
        </View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
        <View>
          <Text style={styles.timer}>A 00:00</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>SET</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.overview}>Your 3 hours and 30 minutes duration has been set.</Text>
        </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  titleText:{
    fontSize:35,
    fontWeight:'bold',
    color:'blue', 
    marginTop:50
  },
  timer:{
    fontSize:30,
    fontWeight:'bold',
    marginTop:20,
  },
  button:{
    marginTop:20,
    width:100,
    height:40,
    backgroundColor:"red",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    color:'white',
  },
  overview:{
    marginTop:20,
  }
})