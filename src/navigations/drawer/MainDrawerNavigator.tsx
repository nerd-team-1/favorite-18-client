import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Example1HomeScreen from '@/screens/example1/Example1HomeScreen';
import Example2HomeScreen from '@/screens/example2/Example2HomeScreen';
import Example3HomeScreen from '@/screens/example3/Example3HomeScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Example1Home" component={Example1HomeScreen} />
      <Drawer.Screen name="Example2Home" component={Example2HomeScreen} />
      <Drawer.Screen name="Example3Home" component={Example3HomeScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
