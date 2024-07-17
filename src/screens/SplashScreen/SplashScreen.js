import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Image, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, Text } from 'react-native-paper';
import { version } from '../../../package.json';
import { useDispatch } from 'react-redux';
import { handleCurrentLoaginUser } from '../../redux/reducers/user/userReducer';

const SplashScreen = ({ navigation }) => {
  const isAppFirstLaunched = useRef(true);
  const userRole = useRef(null);
  const dispatch = useDispatch()
  // Function to handle logout
  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('isLoggedIn');
      // Navigate to the login screen or welcome screen
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  useEffect(() => {
    const firstLaunch = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched1');
      if (appData) {
        isAppFirstLaunched.current = false;
      } else {
        isAppFirstLaunched.current = true;
        await AsyncStorage.setItem('isAppFirstLaunched1', '1');
      }
    };
    firstLaunch();
  }, []);

  useEffect(() => {
    const userRoleHandler = async () => {
      const role = await AsyncStorage.getItem('role');
      userRole.current = role;
    };
    userRoleHandler();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        let screenTo = "Onboarding";

        if (isAppFirstLaunched.current) {
          screenTo = { name: "Onboarding" };
        } else if (!isLoggedIn) {
          screenTo = { name: "WelcomeScreen" };
        } else if (isLoggedIn && userRole.current === "freeflexer") {
          screenTo = { name: "Main", params: { screen: "HomeStack", params: { screen: "FreeflexerHomeScreen" } } };
        } else if (isLoggedIn && userRole.current === "contractor") {
          screenTo = { name: "Main", params: { screen: "HomeStack", params: { screen: "ContractorHomeScreen" } } };
        }

        navigation.replace(screenTo.name, screenTo.params);
      } catch (err) {
        console.log(err);
      }
    };

    checkLoginStatus();
  }, []);

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const email = await AsyncStorage.getItem('email');
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      const role = await AsyncStorage.getItem('role');
      dispatch(handleCurrentLoaginUser({ email: email, token: token, id: userId, role: role }))
    }
    getUserInfo()
  })
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary
      }}>
      <View
        style={{
          flex: 0.95,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../../assets/logot.png')}
        />
      </View>
      <Text style={{ fontWeight: 'bold', color: theme.colors.onPrimary }}>
        V {version}
      </Text>
    </View>
  );
};

export default SplashScreen;
