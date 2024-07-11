import React from 'react';
import {
  colors,
  mainColors,
  rankingTabNavigations,
  songTabNavigations,
  surrondTabNavigations,
} from '@/constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SongStackNavigator from '../stack/SongStackNavigator';
import RankingStackNavigator from '../stack/RankingStackNavigator';
import SurroundStackNavigator from '../stack/SurrondStackNavigator';
import {RouteProp} from '@react-navigation/native';
import CustomTabBar from '@/components/common/CustomTabBar';

export type MainTabParamList = {
  [rankingTabNavigations.RANKING_HOME]: undefined;
  [songTabNavigations.SONG_HOME]: undefined;
  [surrondTabNavigations.SURROND_HOME]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabBarIcons(route: RouteProp<MainTabParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case rankingTabNavigations.RANKING_HOME: {
      iconName = 'bar-chart';
      break;
    }
    case songTabNavigations.SONG_HOME: {
      iconName = 'search';
      break;
    }
    case surrondTabNavigations.SURROND_HOME: {
      iconName = 'map';
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      color={
        focused && iconName !== 'search'
          ? mainColors.LIGHT_GREEN
          : colors.GRAY_200
      }
      size={32}
    />
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator tabBar={props => CustomTabBar(props)}>
      <Tab.Screen
        name={rankingTabNavigations.RANKING_HOME}
        component={RankingStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => TabBarIcons(route, focused),
        })}
      />
      <Tab.Screen
        name={songTabNavigations.SONG_HOME}
        component={SongStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => TabBarIcons(route, focused),
        })}
      />
      <Tab.Screen
        name={surrondTabNavigations.SURROND_HOME}
        component={SurroundStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => TabBarIcons(route, focused),
        })}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
