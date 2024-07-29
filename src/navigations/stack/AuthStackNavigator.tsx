import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import {authNavigations} from '@/constants';
import SignUpGoogleScreen from '@/screens/auth/SignUpGoogleScreen';
import {UserInfo} from '@/types/common';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.SIGN_UP]: {authCode: string; userInfo: UserInfo};
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.SIGN_UP}
        component={SignUpGoogleScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
