import React from 'react';
import {mainColors, modelNavigations} from '@/constants';
import {createStackNavigator} from '@react-navigation/stack';
import ModelHomeScreen from '@/screens/model/ModelHomeScreen';
import ModelScoreScreen from '@/screens/model/ModelScoreScreen';

export type ModelStackParamList = {
  [modelNavigations.MODEL_HOME]: undefined;
  [modelNavigations.MODEL_SCORE]: undefined;
};

const Stack = createStackNavigator<ModelStackParamList>();

function ModelStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: mainColors.BLACK,
        },
      }}>
      <Stack.Screen
        name={modelNavigations.MODEL_HOME}
        component={ModelHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={modelNavigations.MODEL_SCORE}
        component={ModelScoreScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ModelStackNavigator;
