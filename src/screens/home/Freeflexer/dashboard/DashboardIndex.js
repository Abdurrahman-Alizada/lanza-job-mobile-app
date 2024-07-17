import { View, ScrollView} from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import MyActionAndReminder from './MyActionAndReminder'
import FutureShifts from './FutureShifts'
import PastShift from './PastShift'
import HomeScreenAppbar from '../../../../components/Appbars/HomeScreenAppbar'

const FreeflexerDashboardIndex = () => {
  const theme= useTheme();
  return (
    <View style={{flex:1, backgroundColor:theme.colors.background}}>
      <HomeScreenAppbar greetingText="Dashboard"/>
      <ScrollView>
     <View style={{padding:'5%', marginTop:100}}> 
     
     <MyActionAndReminder/>
     <FutureShifts/>
     <PastShift/> 
           </View> 
           </ScrollView>

     </View>
    
    
  )
}

export default FreeflexerDashboardIndex