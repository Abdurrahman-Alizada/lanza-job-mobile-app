import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';

const PlanningIndex = ({navigation}) => {
  const theme = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ContractorDashboardGeneralAppbar greetingText="Planning" />
  
      <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center", padding: "4%", }}>
        <Text style={{fontWeight:"800", fontSize:16}}>Week 00</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("CreateShift")} style={{ padding: "3%", width: "45%", borderRadius: 5, backgroundColor: theme.colors.primary }}>
          <Text style={{ color: theme.colors.onPrimary, fontWeight: "700", alignSelf: "center" }}>Create shift</Text>
        </TouchableOpacity>
      </View>


    </View>
  )

}

export default PlanningIndex