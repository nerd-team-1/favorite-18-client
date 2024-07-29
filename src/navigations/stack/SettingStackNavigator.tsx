import React from 'react';
import {mainColors, settingNavigations} from '@/constants';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';

export type SettingStackParamList = {
  [settingNavigations.EDIT_PROFILE]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

function SettingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: mainColors.BLACK,
        },
      }}>
      <Stack.Screen
        name={settingNavigations.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;
