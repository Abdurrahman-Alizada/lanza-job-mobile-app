import React, {useCallback, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Onboarding from './src/screens/Onboarding/OnboardingScreen';

import MainStack from './src/navigation/MainStack';
import Auth from './src/navigation/AuthStack';

import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {lightPalette, darkPalette} from './src/GlobalStyles';

const Stack = createStackNavigator();

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';

import {fontConfig} from './src/GlobalStyles';
import {ThemeContext} from './src/themeContext';
import WelcomeScreenIndex from './src/screens/WelcomeScreen/WelcomeScreenIndex';
import { LogBox } from 'react-native';

export const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...PaperDarkTheme?.colors,
      ...NavigationDarkTheme.colors,
      ...darkPalette,
    },
    fonts: configureFonts({config: fontConfig}),
  };

  const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...PaperDefaultTheme?.colors,
      ...NavigationDefaultTheme.colors,
      ...lightPalette,
    },
    fonts: configureFonts({config: fontConfig}),
  };

  let theme: any = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

  return (
    <ThemeContext.Provider value={preferences}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreenIndex}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Main"
                component={MainStack}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
