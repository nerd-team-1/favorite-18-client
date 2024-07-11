import React from 'react';
import {mainColors, rankingNavigations} from '@/constants';
import {createStackNavigator} from '@react-navigation/stack';
import RankingHomeScreen from '@/screens/ranking/RankingHomeScreen';

export type RankingStackParamList = {
  [rankingNavigations.RANKING_HOME]: undefined;
};

const Stack = createStackNavigator<RankingStackParamList>();

function RankingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: mainColors.BLACK,
        },
      }}>
      <Stack.Screen
        name={rankingNavigations.RANKING_HOME}
        component={RankingHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RankingStackNavigator;
