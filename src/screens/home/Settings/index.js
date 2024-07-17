import { StyleSheet, View } from 'react-native'
import React from 'react'
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar'
import { Text } from 'react-native-paper'
const Index = () => {
  return (
    <View>
      <HomeScreenAppbar />
      <Text>Settings</Text>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})