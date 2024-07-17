import { View } from 'react-native';
import React, { useState } from 'react';
import { Text, List, useTheme, Chip, Card, Button, Avatar, IconButton } from 'react-native-paper';

export default function FuturShifts({ navigation }) {
  const theme = useTheme();
  const [filterChips, setFilterChips] = useState(['All 0', 'Applied 0', 'Selected 0', 'Cancelled 0', 'Substituted 0', 'Not chosen 0', 'Rejected 0']);
  const [selectedFilterChips, setSelectedFilterChips] = useState('All');
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [cardsData, setCardData] = useState([
    {
      title: 'LE CANNIBALE CAFE'
    },
    {
      title: 'LE CANNIBALE CAFE'
    }
  ]);

  return (
    <View style={{ backgroundColor: theme.colors.lightgrey, borderRadius: 6, marginTop: 20 }}>
      <List.Accordion
        style={{
          backgroundColor: theme.colors.lightgrey,
          borderBottomStartRadius: expanded ? 0 : 6,
          borderBottomEndRadius: expanded ? 0 : 6,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6
        }}
        title="Future shifts"
        titleStyle={{ color: theme.colors.onBackground, fontWeight: 'bold' }}
        expanded={expanded}
        onPress={handlePress}
      >
        <View style={{ borderBottomColor: theme.colors.placeholder, borderBottomWidth: 1 }} />

        <View style={{ flexDirection: 'row', padding: '2%', flexWrap: 'wrap' }}>
          {
            filterChips.map((item, index) => (
              <Chip
                style={{
                  marginTop: '4%',
                  marginRight: '4%',
                  borderRadius: 15,
                  backgroundColor: item === selectedFilterChips ? 'blue' : '#c0c0c0',
                }}
                textStyle={{ color: item === selectedFilterChips ? 'white' : 'black' }}
                key={index}
                onPress={() => setSelectedFilterChips(item)}
              >
                {item}
              </Chip>
            ))
          }
        </View>
        {
          cardsData.map((item, index) =>
            <Card
              key={index}
              style={{
                backgroundColor: theme.colors.background,
                marginTop: 20,
                borderRadius: 5,
                padding: "3%"
              }}
            >
              <Card.Content>
                <Text style={{ color: theme.colors.placeholder, fontSize: 12 }}>Tuesday, 4 June</Text>
              </Card.Content>
              <Card.Title
                title={item.title}
                subtitle="17:00 - 1:00"
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="bookmark-multiple-outline"
                    iconColor={theme.colors.primary}
                    onPress={() => { }}
                  />
                )}
              />
              <View
                style={{
                  borderBottomColor: theme.colors.primary,
                  borderBottomWidth: 1,
                  marginVertical: 8,
                  marginLeft: 15,
                  marginRight: 15,
                }}
              />
              <Text style={{ fontWeight: 'bold', marginLeft: 15, marginTop: 11 }}>Head waiter - 2.5 km</Text>
              <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 10, justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontWeight: '700', color: "#0000ff" }}>$16.00/hr</Text>
                  <Text style={{ color: theme.colors.placeholder, fontSize: 12, marginLeft: 10 }}>Estimated $16.00/hr</Text>
                </View>
                <Button style={{ borderRadius: 8, backgroundColor: '#ff4500' }} onPress={() => navigation.navigate("JobDetailsScreen", { jobId: item._id })}>
                  <Text style={{ color: theme.colors.background }}>You Cancelled</Text>
                </Button>
              </View>
            </Card>
          )
        }
      </List.Accordion>
    </View>
  );
}
