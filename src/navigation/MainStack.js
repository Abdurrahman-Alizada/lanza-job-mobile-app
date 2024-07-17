import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsStack from './SettingsStack';
import HomeStack from './HomeStack';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeStack'>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
