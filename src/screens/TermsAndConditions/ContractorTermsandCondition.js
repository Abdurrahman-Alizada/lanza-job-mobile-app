import React, { useState } from 'react';
import { View } from 'react-native';
import CustomNavigationBar from '../../components/Appbars/JobsDetailsAppbar';
import { Text, useTheme, Checkbox, Button } from 'react-native-paper';

export default function FreeflexerTermsAndCondition() {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <CustomNavigationBar />
      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 15, fontSize: 22 }}>Welcome!</Text>
        <Text style={{
          marginTop: 20,
          fontSize: 15,
          textAlign: 'justify',
          letterSpacing: 0.5,
          lineHeight: 19
        }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </Text>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginTop: 110,
        width: '100%'
      }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color={theme.colors.primary}
        />
        <View style={{ flex: 1 }}>
          <Text style={{
            color: '#696969',
            fontSize: 15,
            marginLeft: 8
          }}>
            I will take these responsibilities and would
          </Text>
          <Text style={{
            color: '#696969',
            fontSize: 15,
            marginLeft: 8
          }}>
            like to become a FreeFlexer
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 35, width: '100%' }}>
        <Button
          mode="contained"
          onPress={() => {}}
          style={{
            width: '90%',
            borderRadius: 6,
            backgroundColor: theme.colors.primary,
            opacity: checked ? 1 : 0.5 // Make the button blurry when disabled
          }}
          contentStyle={{ height: 48 }}
          labelStyle={{ color: 'white', fontSize: 16 }}
          disabled={!checked} // Disable the button if checkbox is unchecked
        >
          Let's do this!
        </Button>
        
        <Button
          mode="text"
          onPress={() => {}}
          labelStyle={{ color: checked ? 'blue' : 'rgba(0, 0, 255, 0.5)', fontSize: 16 }} // Change text color based on checked state
          style={{ marginTop: 10 }}
          disabled={!checked} // Disable the button if checkbox is unchecked
        >
          I have some questions
        </Button>
      </View>
    </View>
  );
}
