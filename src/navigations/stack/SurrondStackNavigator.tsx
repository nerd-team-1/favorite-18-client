import React from 'react';
import {mainColors, surroundNavigations} from '@/constants';
import {createStackNavigator} from '@react-navigation/stack';
import SurrondHomeScreen from '@/screens/surrond/SurroundHomeScreen';

export type SurroundStackParamList = {
  [surroundNavigations.SURROND_HOME]: undefined;
};

const Stack = createStackNavigator<SurroundStackParamList>();

function SurroundStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: mainColors.BLACK,
        },
      }}>
      <Stack.Screen
        name={surroundNavigations.SURROND_HOME}
        component={SurrondHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SurroundStackNavigator;
