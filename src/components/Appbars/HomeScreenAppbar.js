import React, { useContext } from 'react';
import { Appbar, Avatar, Button, IconButton, Text, useTheme } from 'react-native-paper';
import { useNavigation, } from '@react-navigation/native';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../themeContext';

const HomeScreenAppbar = ({ isMainScreen = true, greetingText = "Find your dream job" }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <Appbar.Header
      style={{ backgroundColor: theme.colors.background }}
    // elevated={true}
    >
      <StatusBar
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <View style={{ width: "100%", paddingHorizontal: "2%", flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        {
          isMainScreen ?
            <IconButton
              icon="layers-triple-outline"
              size={30}
              onPress={() => navigation.navigate("FreeflexerDashboard")}
            />
            :
            <Appbar.BackAction onPress={() => navigation.goBack()} />
        }

        <View style={{ flexDirection: "column", paddingVertical: "2%", alignItems: 'center' }}>
          {
            isMainScreen &&
            <Text>Welcome, Jolia</Text>
          }
          {/* <Appbar.Content title={greetingText} /> */}

          <Text style={{ fontSize: 16, fontWeight: "800" }}>{greetingText}</Text>
        </View>

        <IconButton
          icon="menu"
          size={30}
          onPress={() => navigation.navigate("FreeflexerMenu")}
        />
      </View>
    </Appbar.Header>
  );
};

export default HomeScreenAppbar;
