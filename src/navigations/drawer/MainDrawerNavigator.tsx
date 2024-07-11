import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {colors, mainColors, mainNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';
import MainDrawerHeaderRight from '@/components/common/MainDrawerHeaderRight';
import MainDrawerHeaderLeft from '@/components/common/MainDrawerHeaderLeft';
import MainTabNavigator from '../tab/MainTabNavigator';
import {SongStackParamList} from '../stack/SongStackNavigator';
import {Dimensions} from 'react-native';
import ModelHomeScreen from '@/screens/model/ModelHomeScreen';
import QnaHomeScreen from '@/screens/qna/QnaHomeScreen';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<SongStackParamList>;
  [mainNavigations.MODEL]: undefined;
  [mainNavigations.QNA]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerTitle: '',
        headerStyle: {
          backgroundColor: mainColors.BLACK,
        },
        headerLeft: () => MainDrawerHeaderLeft(),
        headerRight: () => MainDrawerHeaderRight(navigation),
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.7,
          backgroundColor: colors.BLACK,
        },
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.GRAY_500,
        drawerActiveBackgroundColor: colors.WHITE,
        drawerLabelStyle: {
          fontWeight: '600',
        },
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MainTabNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.MODEL}
        component={ModelHomeScreen}
        options={{
          title: '점수분석',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.QNA}
        component={QnaHomeScreen}
        options={{
          title: '1:1 문의',
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
