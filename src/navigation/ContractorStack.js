import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import GeneralAppbar from '../components/Appbars/GeneralAppbar';
import ContractorHomeScreen from '../screens/home/Contractor/index';
import FreeFlexerTermsAndConditions from '../screens/TermsAndConditions/FreeflexerTermsAndConditions';
import ContractorDashboardIndex from '../screens/home/Contractor/dashboard/DashboardIndex';
import ContractorMenuIndex from '../screens/home/Contractor/Menu/MenuIndex';
import PlanningIndex from '../screens/home/Contractor/planning/PlanningIndex';
import ProjectIndex from '../screens/home/Contractor/projects/ProjectsIndex';
import CheckoutIndex from '../screens/home/Contractor/checkouts/Checkouts';
import FlexpoolIndex from '../screens/home/Contractor/flexpools/FlexpoolIndex';
import BusinessesIndex from '../screens/home/Contractor/businesses/BusinessesIndex';
import CreateBusiness from '../screens/home/Contractor/businesses/CreateBusiness';
import CreateJob from '../screens/home/Contractor/planning/CreateShift';
import ContractorDashboardGeneralAppbar from '../components/Appbars/ContractorDashboardGeneralAppbar';
import BusinessDetail from '../screens/home/Contractor/businesses/BusinessDetail';
import UpdateBusiness from '../screens/home/Contractor/businesses/UpdateBusinessDetail';
import CreateProject from '../screens/home/Contractor/projects/CreateProject';
import ProjectDetail from '../screens/home/Contractor/projects/ProjectDetail';
import UpdateProject from '../screens/home/Contractor/projects/UpdateProjectDetail';
import ContractorProfile from '../screens/home/Contractor/Profile/ProfileIndex';

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='ContractorHomeScreen' >

      <Stack.Screen
        name="ContractorHomeScreen"
        component={ContractorHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContractorDashboard"
        component={ContractorDashboardIndex}
        options={{
          header: props => (
            <ContractorDashboardGeneralAppbar greetingText={'Dashboard'} {...props} />
          )
        }}
      />
        <Stack.Screen
        name="ContractorProfile"
        component={ContractorProfile}
        options={{
          header: props => (
            <ContractorDashboardGeneralAppbar greetingText={'Profile'} {...props} />
          )
        }}
      />
      <Stack.Screen
        name="ContractorPlanning"
        component={PlanningIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateShift"
        component={CreateJob}
        options={{
          header: props => (
            <ContractorDashboardGeneralAppbar greetingText={'Create job'} {...props} />
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
        name="CreateProject"
        component={CreateProject}
        options={{
          header: props => (
            <ContractorDashboardGeneralAppbar greetingText={'Create project'} {...props} />
          )
        }}
      />
        <Stack.Screen
        name="UpdateProject"
        component={UpdateProject}
        options={{
          header: props => (
            <GeneralAppbar title={'Update project'} {...props} />
          )
        }}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetail}
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

    </Stack.Navigator>
  );
};

export default AppStack;
