import React from 'react';
import HeaderButton from './HeaderButton';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {mainColors} from '@/constants';

type MainDrawerHeaderRightProps = DrawerNavigationProp<MainDrawerParamList>;

function MainDrawerHeaderRight(navigation: MainDrawerHeaderRightProps) {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={mainColors.LIGHT_GREEN} size={35} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default MainDrawerHeaderRight;
