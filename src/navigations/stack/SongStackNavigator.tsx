import React from 'react';
import {mainColors, songNavigations} from '@/constants';
import {createStackNavigator} from '@react-navigation/stack';
import SongHomeScreen from '@/screens/song/SongHomeScreen';
import SongInfoDetailScreen from '@/screens/song/SongInfoDetailScreen';
import SongSearchListScreen from '@/screens/song/SongSearchListScreen';

export type SongStackParamList = {
  [songNavigations.SONG_HOME]: undefined;
  [songNavigations.SONG_SEARCH_LIST]: {searchKeyword: string};
  [songNavigations.SONG_DETAIL]: {songId: number};
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
      <Stack.Screen
        name={songNavigations.SONG_SEARCH_LIST}
        component={SongSearchListScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={songNavigations.SONG_DETAIL}
        component={SongInfoDetailScreen}
        options={{
          headerTitle: '노래 정보',
          headerTintColor: mainColors.LIGHT_GREEN,
          headerStyle: {
            backgroundColor: mainColors.BLACK,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SongStackNavigator;
