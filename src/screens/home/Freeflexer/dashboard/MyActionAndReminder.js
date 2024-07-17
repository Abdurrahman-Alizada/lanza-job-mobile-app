import { View, Image } from 'react-native';
import React from 'react';
import { Text, List, useTheme } from 'react-native-paper';

export default function MyActionAndReminder() {
  const [expanded, setExpanded] = React.useState(true);
  const theme = useTheme();

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={{ backgroundColor: theme.colors.lightgrey, borderRadius: 6 }}>
      <List.Accordion
        style={{
          backgroundColor: theme.colors.lightgrey,
          borderBottomStartRadius: expanded ? 0 : 6,
          borderBottomEndRadius: expanded ? 0 : 6,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6
        }}
        title="My action and reminder"
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        expanded={expanded}
        onPress={handlePress}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', padding:16, marginVertical:'8%' }}>
          <Image
            source={require('../../../../assets/ActionReminder.png')}
            style={{ width: '50%', height: 100 }}
          />
        </View>
      </List.Accordion>
    </View>
  );
}
