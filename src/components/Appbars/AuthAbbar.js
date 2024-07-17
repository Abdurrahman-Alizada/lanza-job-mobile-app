import { Appbar, Text, useTheme, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../themeContext';
import CountryFlag from 'react-native-country-flag';
import i18next from 'i18next';
import { useSelector } from 'react-redux';

export default function AuthAbbar({ title }) {
  const navigation = useNavigation();
  const theme = useTheme();
  const { t } = useTranslation();

  const { toggleTheme, isThemeDark } = useContext(ThemeContext);
  const currentLanguage = useSelector(state => state.settings.currentLanguage)
 
  return (
    <Appbar.Header>
      <StatusBar
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.background,
          justifyContent: 'space-between',
          alignItems: "center"
        }}>
        <View style={{ alignItems: 'center', width: '33%' }}>
          {
            title !== "Home" &&

            <Appbar.BackAction
              style={{ alignSelf: 'flex-start' }}
              onPress={() => navigation.goBack()}
            />
          }

        </View>
        <View style={{ width: '33%' }}>
          <Image
            style={{
              width: 100,
              height: 80,
              resizeMode: "contain"
            }}
            source={require('../../assets/logob.png')}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems:"center" }}>
          {isThemeDark ? (
            <IconButton
              icon="white-balance-sunny"
              titleStyle={{ color: theme.colors.onBackground }}
              onPress={() => toggleTheme()}
            />
          ) : (
            <IconButton icon="weather-night" onPress={() => toggleTheme()} />
          )}
          <TouchableOpacity
           onPress={() => {
            navigation.navigate('Main', {
              screen: 'SettingsStack',
              params: {
                screen: 'ChooseLanguage',
              },
            });
          }}
            style={{ marginHorizontal: '3%' }}
          >
            <CountryFlag isoCode={currentLanguage === "en" ? 'gb' : currentLanguage} size={18} />
          </TouchableOpacity>

        </View>
      </View>

    </Appbar.Header>
  );
}
