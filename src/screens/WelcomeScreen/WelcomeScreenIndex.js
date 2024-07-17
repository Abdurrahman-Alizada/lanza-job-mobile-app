import { View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { Avatar, Button, Text, useTheme } from 'react-native-paper'
import AuthAppbar from "../../components/Appbars/AuthAbbar"
import { useNavigation } from '@react-navigation/native'

const WelcomeScreenIndex = () => {
  const theme = useTheme();
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: theme.colors.background }}>
      <AuthAppbar title={'Home'} />

      <View>
        <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 24 }}>What do you wanna do?</Text>
        <Text style={{ textAlign: "center", maxWidth: "70%", alignSelf: "center" }}>Select whether you’re seeking
          employment opportunities or your
          organization requires talented individuals  </Text>
      </View>

      <View
        style={{
          marginTop: '15%',
          marginHorizontal: '2%',
          flexGrow: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Auth", {screen:"FreeflexerSignUpwithEmail"})
          }}
          style={{
            height: '55%',
            borderRadius: 5,
            backgroundColor: theme.colors.textRed,
            width: '48%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.onBackground
          }}>
          <Avatar.Icon
            icon={require('../../assets/briefcase.png')}
            style={{ marginTop: -20, backgroundColor: theme.colors.primary, alignSelf: 'center' }}
            size={60}
            color={theme.colors.onPrimary}
          />
          <Text
            style={{
              color: theme.colors.primary,
              marginTop: '4%',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: "center"
            }}>
            {"I want to work"}
          </Text>
          <Text style={{ textAlign: "center", width: "70%", alignSelf: "center" }}>
            Looking for attractive
            shifts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Auth", {screen:"ContractorSignUpwithEmail"})
          }}
          style={{
            height: '55%',
            borderRadius: 5,
            backgroundColor: theme.colors.textRed,
            width: '48%',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.onBackground

          }}>
          <Avatar.Icon
            icon={require('../../assets/user.png')}
            style={{ backgroundColor: "#EA8135", alignSelf: 'center' }}
            size={60}
            color={theme.colors.onPrimary}
          />
          <Text
            style={{
              color: theme.colors.primary,
              marginTop: '4%',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: "center"
            }}>
            I am looking for
            professional
          </Text>
          <Text style={{ textAlign: "center", width: "70%", alignSelf: "center" }}>
            Looking for flexible
            workers
          </Text>
        </TouchableOpacity>

      </View>

      <View style={{ paddingBottom: "5%" }}>
        <Button onPress={() => navigation.navigate("Auth")} style={{ padding: "2%" }}>Already have an account? Sign in</Button>
      </View>
    </View>
  )
}

export default WelcomeScreenIndex