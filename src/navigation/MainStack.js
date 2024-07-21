import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsStack from './SettingsStack';
import ContractorStack from './ContractorStack';
import FreeflexerStack from './FreeflexerStack';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeStack'>
      <Stack.Screen
        name="ContractorStack"
        component={ContractorStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FreeflexerStack"
        component={FreeflexerStack}
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
