// import React, { useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { Button, Card, Menu, Provider } from 'react-native-paper';
// import DatePicker from 'react-native-date-picker';

// const PlanningScreen = () => {
//   const [visible, setVisible] = useState(false);
//   const [status, setStatus] = useState('Statuses');
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [datePicker, setDatePicker] = useState(null);

//   const openMenu = () => setVisible(true);
//   const closeMenu = () => setVisible(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     setSelectedDate(date);
//     hideDatePicker();
//   };

//   return (
//     <Provider>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Planning</Text>
//           <Button icon="web" accessibilityLabel="Web button" />
//         </View>
//         <View style={styles.weekSection}>
//           <Text style={styles.weekText}>Week {getWeekNumber(new Date())}</Text>
//           <Button mode="contained" onPress={() => console.log('Create shift')}>
//             Create shift
//           </Button>
//         </View>
//         <View style={styles.menuSection}>
//           <Button
//             icon="calendar"
//             onPress={showDatePicker}
//             accessibilityLabel="Open date picker"
//           />
//           <Text>Week</Text>
//           <Menu
//             visible={visible}
//             onDismiss={closeMenu}
//             anchor={<Button onPress={openMenu}>{status}</Button>}
//           >
//             <Menu.Item onPress={() => setStatus('Option 1')} title="Option 1" />
//             <Menu.Item onPress={() => setStatus('Option 2')} title="Option 2" />
//             <Menu.Item onPress={() => setStatus('Option 3')} title="Option 3" />
//           </Menu>
//         </View>
//         <Text style={styles.agreementText}>Agreement 10</Text>
//         <View style={styles.cardContainer}>
//           {[1, 2, 3, 4].map((_, index) => (
//             <Card key={index} style={styles.card}>
//               <Card.Content>
//                 <Text style={styles.cardTitle}>June MO 10</Text>
//                 <Text>Driver</Text>
//                 <View style={styles.cardContent}>
//                   <Text>0/1</Text>
//                   <Text style={styles.redText}>22:00 - 05:00</Text>
//                 </View>
//                 <Text>Sweeper</Text>
//                 <View style={styles.cardContent}>
//                   <Text>0/1</Text>
//                   <Text style={styles.orangeText}>22:00 - 05:00</Text>
//                 </View>
//               </Card.Content>
//             </Card>
//           ))}
//         </View>
//         {isDatePickerVisible && (
//           <DatePicker
//             modal
//             mode="date"
//             open={isDatePickerVisible}
//             date={selectedDate}
//             onConfirm={handleConfirm}
//             onCancel={hideDatePicker}
//           />
//         )}
//       </ScrollView>
//     </Provider>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#FFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   weekSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: 16,
//   },
//   weekText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   menuSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   agreementText: {
//     color: 'blue',
//     marginBottom: 8,
//   },
//   cardContainer: {
// flexDirection: 'row',
// flexWrap: 'wrap',
// justifyContent: 'space-between',
//   },
//   card: {
//     width: '48%',
//     marginBottom: 16,
//   },
//   cardTitle: {
// fontSize: 16,
// fontWeight: 'bold',
//   },
//   cardContent: {
// flexDirection: 'row',
// justifyContent: 'space-between',
// marginVertical: 8,
//   },
//   redText: {
//     color: 'red',
//   },
//   orangeText: {
//     color: 'orange',
//   },
// });

// export default PlanningScreen;

import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Text, Button, Menu, Card, IconButton, Icon, Divider } from 'react-native-paper'
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';
import DatePicker from 'react-native-date-picker';

const PlanningIndex = ({ navigation }) => {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Statuses');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };


  const incrementWeek = () => {
    setWeekOffset(weekOffset + 1);
  };

  const decrementWeek = () => {
    setWeekOffset(weekOffset - 1);
  };

  const currentWeekNumber = getWeekNumber(new Date());
  const displayedWeekNumber = currentWeekNumber + weekOffset;
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ContractorDashboardGeneralAppbar greetingText="Planning" />
      <ScrollView contentContainerStyle={{ padding: "4%" }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
          <Text style={{ fontWeight: "800", fontSize: 16 }}>Week {displayedWeekNumber}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("CreateShift")} style={{ padding: "3%", width: "45%", borderRadius: 5, backgroundColor: theme.colors.primary }}>
            <Text style={{ color: theme.colors.onPrimary, fontWeight: "700", alignSelf: "center" }}>Create job</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 16,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
            // paddingHorizontal: 5,
            borderRadius: 4,
          }}>

            <IconButton
              icon="chevron-left"
              size={20}
              onPress={decrementWeek}
              accessibilityLabel="Decrement week"
            />
            <IconButton
              icon="calendar"
              size={20}
              onPress={showDatePicker}
              accessibilityLabel="Calendar week"
            />
            {/* <Button
              icon="calendar"
              onPress={showDatePicker}
              accessibilityLabel="Open date picker"
            /> */}
            <IconButton
              icon="chevron-right"
              size={20}
              onPress={incrementWeek}
              accessibilityLabel="Increment week"
            />
          </View>

          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>{status}</Button>}
          >
            <Menu.Item onPress={() => setStatus('Option 1')} title="Option 1" />
            <Menu.Item onPress={() => setStatus('Option 2')} title="Option 2" />
            <Menu.Item onPress={() => setStatus('Option 3')} title="Option 3" />
          </Menu>
        </View>

        <View>

          <Text style={{
            color: 'blue',
            marginBottom: 8,
          }}>Agreement 10</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            {[1, 2, 3, 4].map((_, index) => (
              <Card key={index} style={{
                width: '48%',
                marginBottom: 16,
              }}>
                <Card.Content>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>June MO 10</Text>
                  <Text>Driver</Text>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}>
                    <Text>0/1</Text>
                    <Text style={{ color: 'red' }}>22:00 - 05:00</Text>
                  </View>
                  <Text>Sweeper</Text>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}>
                    <Text>0/1</Text>
                    <Text style={{
                      color: 'orange',
                    }}>22:00 - 05:00</Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
          {isDatePickerVisible && (
            <DatePicker
              modal
              mode="date"
              open={isDatePickerVisible}
              date={selectedDate}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          )}
        </View>

      </ScrollView>
    </View>
  )

}

export default PlanningIndex

const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};
