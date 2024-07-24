import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import GeneralAppbar from '../components/Appbars/GeneralAppbar';
import MainJobsFilterScreen from '../screens/home/Freeflexer/JobsFilter/MainJobsFilterScreen';
import JobDetailsScreen from '../screens/home/Freeflexer/JobDetails/JobDetailsScreen';
import FreeFlexerTermsAndConditions from '../screens/TermsAndConditions/FreeflexerTermsAndConditions';
import FreeflexerHomeScreen from '../screens/home/Freeflexer';
import FreeflexerDashboardIndex from '../screens/home/Freeflexer/dashboard/DashboardIndex';
import ProfileWelcomeIndex from '../screens/home/Freeflexer/Profile/ProfileWelcomeScreen/ProfileWelcomeIndex';
import ToDoSteps from '../screens/home/Freeflexer/Profile/ProfileToDoSteps/ToDoSteps';
import EditProfile from '../screens/home/Freeflexer/Profile/EditProfile/EditProfile';
import AddBio from '../screens/home/Freeflexer/Profile/AddBio/AddBio';
import AddLanguages from '../screens/home/Freeflexer/Profile/AddLanguages/AddLanguages';
import FreeflexerMenuIndex from '../screens/home/Freeflexer/Menu/MenuIndex';

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='FreeflexerHomeScreen'>

      <Stack.Screen
        name="FreeflexerHomeScreen"
        component={FreeflexerHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FreeflexerDashboard"
        component={FreeflexerDashboardIndex}
        options={{
          header: props => (
            <GeneralAppbar title={'Dashboard'} {...props} />
          )
        }}
      />
      <Stack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FreeFlexerTermsAndConditions"
        component={FreeFlexerTermsAndConditions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainJobsFilterScreen"
        component={MainJobsFilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FreeflexerMenu"
        component={FreeflexerMenuIndex}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileWelcomeIndex"
        component={ProfileWelcomeIndex}
        options={{
          header: props => (
            <GeneralAppbar title={''} {...props} />
          )
        }}
      />

      <Stack.Screen
        name="ToDoSteps"
        component={ToDoSteps}
        options={{
          header: props => (
            <GeneralAppbar title={''} {...props} />
          )
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: props => (
            <GeneralAppbar title={''} {...props} />
          )
        }}
      />

      <Stack.Screen
        name="AddBio"
        component={AddBio}
        options={{
          header: props => (
            <GeneralAppbar title={''} {...props} />
          )
        }} />

      <Stack.Screen
        name="AddLanguages"
        component={AddLanguages}
        options={{
          header: props => (
            <GeneralAppbar title={''} {...props} />
          )
        }} />



    </Stack.Navigator>
  );
};

export default AppStack;
