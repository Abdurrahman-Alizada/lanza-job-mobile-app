import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon, Text, useTheme, Button, IconButton, Dialog, Portal, Menu, Divider } from 'react-native-paper';
import GeneralAppbar from '../../../../../components/Appbars/GeneralAppbar';
import { useNavigation } from '@react-navigation/native';
export default function AddLanguages() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false); // State for dialog visibility
  const [selectedLanguage, setSelectedLanguage] = useState(''); // State for selected language
  const [selectedLevel, setSelectedLevel] = useState(''); // State for selected expertise level
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: '5%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 30 }}>
          Add languages
        </Text>
        <Text
          style={{
            marginTop: 15,
            color: theme.colors.placeholder
          }}
        >
          Add your languages and the level at which you speak them
        </Text>
      </View>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 140,
          flexDirection: 'row'
        }}
        onPress={() => setVisible(true)}
      >
        <IconButton
          icon="plus-circle-outline"
          size={35}
        />
        <Text style={{ color: theme.colors.blue, fontSize: 16 }}>Add language</Text>
      </TouchableOpacity>

      <Button
        onPress={() => console.log('Save')}
        style={{
          backgroundColor: theme.colors.primary,
          padding: 8,
          marginHorizontal: 14,
          borderRadius: 8,
          marginBottom: 25,
          marginTop: 50
        }}
      >
        <Text style={{ color: theme.colors.background, fontWeight: 'bold' }}>Save</Text>
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Select Language and Level</Dialog.Title>
          <Dialog.Content>
            <Menu.Item
              onPress={() => {}}
              title="Language"
              icon="language"
              style={styles.menuItem}
            />
            <Divider />
            <Menu.Item
              onPress={() => {}}
              title="Expertise Level"
              icon="star"
              style={styles.menuItem}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 8,
  },
});
