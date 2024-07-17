import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';

const ProjectIndex = () => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ContractorDashboardGeneralAppbar greetingText="Projects" />
      <Text>ProjectIndex</Text>
    </View>
  )
}

export default ProjectIndex