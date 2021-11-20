import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Logout from '../screens/Logout.js';
import List from '../screens/List';
import Duration from '../screens/Duration'

const Drawer = createDrawerNavigator();

const DrawerNavigator =()=>{
    let props = this.props;
    return(
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          inactiveTintColor: "black",
          itemStyle: { marginVertical: 5 }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="List"
          component={List}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    )
}

export default DrawerNavigator;