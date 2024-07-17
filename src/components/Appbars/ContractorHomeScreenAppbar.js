import React, { useContext } from 'react';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';
import { useNavigation, } from '@react-navigation/native';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../themeContext';

const ContractorHomeScreenAppbar = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <Appbar.Header
      style={{ backgroundColor: theme.colors.background, paddingHorizontal: "3%" }}
      elevated={true}>

      <StatusBar
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <View style={{ width: "70%", flexDirection: "column", paddingVertical: "2%" }}>

        <Text>Welcome, John</Text>
        <Text style={{ fontSize: 16, fontWeight: "800" }}>Find the right talent</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ContractorMenu")} style={{ width: "30%", alignItems: "flex-end" }}>
        <Avatar.Icon icon={"menu"} style={{ backgroundColor: theme.colors.background, borderWidth: 0, borderColor: theme.colors.onBackground }} size={45} />
      </TouchableOpacity>
    </Appbar.Header>
  );
};

export default ContractorHomeScreenAppbar;
