import { ScrollView, View } from 'react-native'
import React from 'react'
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar'
import { List, useTheme } from 'react-native-paper'
import MenuSection from './MenuSection'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ContractorMenuIndex = ({ navigation }) => {
  const theme = useTheme();


  const menus = [
    {
      items: [
        // { title: "Create a shift", icon: "plus-circle-outline", navigateTo: "FreeflexerDashboard" },
        { title: "Create a job", icon: "plus-circle-outline", navigateTo: "CreateShift" }
      ]
    },
    {
      sectionTitle: "HELP",
      items: [
        { title: "Platform guide", icon: "clipboard-text-outline", navigateTo: "ContractorDashboard" },
        { title: "Help", icon: "information-outline", navigateTo: "ContractorDashboard" },
        { title: "Give feedback", icon: "chat-processing-outline", navigateTo: "ContractorDashboard" }
      ]
    },
    {
      sectionTitle: "OTHER",
      items: [
        { title: "Profile", icon: "account-outline", navigateTo: "ContractorProfile" },
        { title: "Businesses", icon: "information-outline", navigateTo: "ContractorBusinesese" },
        // { title: "Financial overview", icon: "chat-processing-outline", navigateTo: "FreeflexerDashboard" },
        // { title: "Statistics", icon: "chart-bar", navigateTo: "FreeflexerDashboard" },
        { title: "Block FreeFlexers", icon: "account-multiple-remove-outline", navigateTo: "ContractorDashboard" },
        { title: "UBD declaration", icon: "notebook-outline", navigateTo: "ContractorDashboard" },
        { title: "Export shift overview", icon: "file-download-outline", navigateTo: "ContractorDashboard" },
        { title: "Notifications", icon: "bell-outline", navigateTo: "ContractorDashboard" }
      ]
    }
  ]

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('isLoggedIn');
      navigation.navigate("Auth", { screen: 'Login' });
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ContractorDashboardGeneralAppbar greetingText="Menu" />
      <ScrollView style={{ paddingLeft: "5%" }}>
        {menus.map((menu, index) =>
          <MenuSection key={index} sectionTitle={menu.sectionTitle} items={menu.items} />
        )}

        <List.Item titleStyle={{ color: theme.colors.error }} onPress={logoutUser} title={"Sign out"} left={() => <List.Icon color={theme.colors.error} icon={"logout"} />} />

      </ScrollView>
    </View>
  )
}

export default ContractorMenuIndex