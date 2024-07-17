import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import GeneralAppbar from '../components/Appbars/GeneralAppbar';
import LanguageIndex from '../screens/Settings/language/LanguageIndex';

const AppStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="ChooseLanguage"
        component={LanguageIndex}
        options={{
          header: props => (
            <GeneralAppbar title={'Choose language'} {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
