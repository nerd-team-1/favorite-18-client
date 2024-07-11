import React from 'react';
import {mainColors, songNavigations} from '@/constants';
import {createStackNavigator} from '@react-navigation/stack';
import SongHomeScreen from '@/screens/song/SongHomeScreen';

export type SongStackParamList = {
  [songNavigations.SONG_HOME]: undefined;
};

const Stack = createStackNavigator<SongStackParamList>();

function SongStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: mainColors.BLACK,
        },
      }}>
      <Stack.Screen
        name={songNavigations.SONG_HOME}
        component={SongHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SongStackNavigator;
