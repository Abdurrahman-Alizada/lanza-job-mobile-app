import { View } from 'react-native';
import React from 'react';
import { Icon, Text, useTheme, Avatar, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ToDoSteps() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ paddingHorizontal: '4%' }}>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 40,
          alignSelf: "center",
          borderWidth: 2,
          borderColor: theme.colors.primary,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{2}/{4}</Text>
        </View>

        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: "5%" }}>
          Boost your earning potential
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: "5%",
          }}
        >
          Increase your earning potential and show clients
          why the need you on their team

        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.lightgrey,
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20

          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon source="account-outline" size={30} color={theme.colors.onBackground} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                Complete your profile
              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                Complete your profile with
              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                correct relevant feilds.
              </Text>
            </View>
          </View>
          <Icon source="chevron-right" size={30} color={theme.colors.onBackground} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { }}
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.lightgrey,
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 18

          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon source="file-document-edit-outline" size={30} color={theme.colors.onBackground} />

            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                Add work experience
              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                Make your profile stand out with


              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                relevant working experience
              </Text>
            </View>
          </View>
          <Icon source="chevron-right" size={30} color={theme.colors.onBackground} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("AddBio")}
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.lightgrey,
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 18

          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

            <Icon source="pencil-outline" size={30} color={theme.colors.onBackground} />

            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                Add your bio
              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                Tell clients about yourself and the

              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                skills you can offer.
              </Text>
            </View>
          </View>
          <Icon source="chevron-right" size={30} color={theme.colors.onBackground} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { }}
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.lightgrey,
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 18

          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

            <Icon source="camera-outline" size={30} color={theme.colors.onBackground} />


            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                Add a profile photo
              </Text>

            </View>
          </View>
          <Icon source="chevron-right" size={30} color={theme.colors.onBackground} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("AddLanguages")}

          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.lightgrey,
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 18

          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

            <Icon source="plus-outline" size={30} color={theme.colors.onBackground} />

            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                Add language
              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                Share any languages you speak and

              </Text>
              <Text style={{ color: theme.colors.placeholder }}>
                your level of proficiency
              </Text>
            </View>
          </View>
          <Icon source="chevron-right" size={30} color={theme.colors.onBackground} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
