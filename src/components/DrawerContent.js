import React, {useEffect, useState, useContext, useRef} from 'react';
import {View, Linking, Alert, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Drawer,
  List,
  useTheme,
  Text,
  Divider,
} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';

export default function DrawerContent(props) {
  const theme = useTheme();


  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: theme.colors.background}}
      contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{marginVertical: '5%'}}>
        {/* <Drawer.Item
          label="Screen 1"
          onPress={() => {
            navigation.navigate('Drawer', {
              sreen: 'Screen1',
              refreshTimeStamp: new Date().toISOString(),
            });
          }}
          icon="account-multiple"
        /> */}
        <Drawer.Item
          label="Screen 2"
          // onPress={() => {
          //   navigation.navigate('MakeFriends', {screen: 'MakeFriendsMain'});
          // }}
          icon="account-multiple"
        />
      </View>

    </DrawerContentScrollView>
  );
}
