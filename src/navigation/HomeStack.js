import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import GeneralAppbar from '../components/Appbars/GeneralAppbar';
import ContractorHomeScreen from '../screens/home/Contractor/index';
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
import ContractorDashboardIndex from '../screens/home/Contractor/dashboard/DashboardIndex';
import ContractorMenuIndex from '../screens/home/Contractor/Menu/MenuIndex';
import PlanningIndex from '../screens/home/Contractor/planning/PlanningIndex';
import ProjectIndex from '../screens/home/Contractor/projects/ProjectsIndex';
import CheckoutIndex from '../screens/home/Contractor/checkouts/Checkouts';
import FlexpoolIndex from '../screens/home/Contractor/flexpools/FlexpoolIndex';
import BusinessesIndex from '../screens/home/Contractor/businesses/BusinessesIndex';
import CreateBusiness from '../screens/home/Contractor/businesses/CreateBusiness';
import CreateShift from '../screens/home/Contractor/planning/CreateShift';
import ContractorDashboardGeneralAppbar from '../components/Appbars/ContractorDashboardGeneralAppbar';
import FreeflexerMenuIndex from '../screens/home/Freeflexer/Menu/MenuIndex';
import BusinessDetail from '../screens/home/Contractor/businesses/BusinessDetail';
import UpdateBusiness from '../screens/home/Contractor/businesses/UpdateBusinessDetail';

const AppStack = () => {
  return (
    <Stack.Navigator>

      {/* Freeflexer */}

      <Stack.Screen
        name="FreeflexerHomeScreen"
        component={FreeflexerHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FreeflexerDashboard"
        component={FreeflexerDashboardIndex}
        options={{ headerShown: false }}
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

      {/* Contractor */}

      <Stack.Screen
        name="ContractorHomeScreen"
        component={ContractorHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorDashboard"
        component={ContractorDashboardIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorPlanning"
        component={PlanningIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateShift"
        component={CreateShift}
        options={{
          header: props => (
            <ContractorDashboardGeneralAppbar greetingText={'Create shift'} {...props} />
          )
        }}
      />
      <Stack.Screen
        name="ContractorBusinesese"
        component={BusinessesIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorBusineseseDetails"
        component={BusinessDetail}
        options={{
          header: props => (
            <ContractorDashboardGeneralAppbar greetingText={'Business detail'} {...props} />
          )
        }} />
      <Stack.Screen
        name="ContractorUpdateBusinesese"
        component={UpdateBusiness}
        options={{
          header: props => (
            <ContractorDashboardGeneralAppbar greetingText={'Update business detail'} {...props} />
          )
        }} />
      <Stack.Screen
        name="CreateBusiness"
        component={CreateBusiness}
        options={{
          header: props => (
            <GeneralAppbar title={'Add business'} {...props} />
          )
        }}
      />
      <Stack.Screen
        name="ContractorProjects"
        component={ProjectIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorCheckouts"
        component={CheckoutIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorFlexpool"
        component={FlexpoolIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorMenu"
        component={ContractorMenuIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorTermsAndConditions"
        component={FreeFlexerTermsAndConditions}
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
