import React from 'react';
import {StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from "react-native-responsive-fontsize";
import Reminder from '../screens/Reminder';
import Duration from '../screens/Duration';

const Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends React.Component{
  render(){
  return(
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({route})=>({
        tabBarIcon:({focused, size, color})=>{
          let iconName
          if(route.name === 'Duration'){
            iconName = focused
              ? 'home'
              : 'home-outline';
          }else if(route.name === 'Reminder'){
            iconName = focused 
            ? 'add-circle' 
            : 'add-circle-outline';
          }
          return (
          <Ionicons 
            name={iconName} 
            size={RFValue(25)} 
            color={color} 
            style={styles.icons}
          />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ee8249',
        inactiveTintColor: 'grey',
      }}>
      <Tab.Screen 
        name='Duration' 
        component={Duration}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen 
        name='Reminder' 
        component={Reminder}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  )
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
})