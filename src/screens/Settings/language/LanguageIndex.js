import {I18nManager, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RadioButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import i18next, {languageResources} from '../../../../locales/i18next';
import {useSelector, useDispatch} from 'react-redux';
import languagesList from '../../../../locales/languagesList.json';
import {handleCurrentLanguage} from '../../../redux/reducers/settings/settingsReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
// import RNRestart from 'react-native-restart'; // Import package from node modules
import CountryFlag from 'react-native-country-flag';

const LanguageIndex = () => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const [languages] = useState(Object.keys(languageResources));

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  // function has been written after 18 hours of work. Don't touch it. First rule of programming
  // if it's working don't touch it
  const searchFilterFunction = async text => {
    const aa = Object.keys(languagesList);
    setFilteredDataSource(aa);
    if (text) {
      let cc = [];
      Object.values(languagesList)?.filter((item, i) => {
        const itemData = item
          ? item.name.toLowerCase() + item.nativeName.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        if (itemData.indexOf(textData) > -1) {
          cc.push(i);
        }
        return itemData.indexOf(textData) > -1;
      });
      let bb = [];
      for (let i = 0; i < cc.length; i++) {
        bb.push(aa[cc[i]]);
      }

      setFilteredDataSource(bb);
    } else {
      setFilteredDataSource(aa);
    }
  };

  useEffect(() => {
    setFilteredDataSource(languages);
  }, [languages]);

  const currentLanguage = useSelector(state => state.settings.currentLanguage);

  const changeLng = async lng => {
    const isNewLanguageRTL = i18next.dir(lng) === 'rtl';
    const isCurrentLayoutRTL = I18nManager.isRTL;
    const isLayoutChangeNeeded = isCurrentLayoutRTL !== isNewLanguageRTL;

    setValue(lng);
    await AsyncStorage.setItem('currentLanguage', lng);
    dispatch(handleCurrentLanguage(lng));
    i18next.changeLanguage(lng).then(async () => {
      const l = i18n.language;
      let isLangRTL = l == 'ar' || l == 'ur';
      I18nManager.forceRTL(isLangRTL);

      if (isLayoutChangeNeeded) {
        await AsyncStorage.setItem('isRTL', lng);
        // RNRestart.restart();
      }
    });
  };
  const [value, setValue] = useState(currentLanguage);
  const [lang, setLang] = useState('');
  const theme = useTheme();
  return (
    <View
      style={{
        paddingVertical: '2%',
        flex: 1,
        paddingHorizontal: '4%',
        backgroundColor: theme.colors.background,
      }}>
      {/* <TextInput
        label={t('Search for language')}
        mode="outlined"
        left={<TextInput.Icon icon={'magnify'} />}
        dense
        value={lang}
        onChangeText={e => {
          setLang(e);
          searchFilterFunction(e);
        }}
        style={{marginBottom: '4%'}}
        activeOutlineColor={theme.colors.secondary}
        /> */}

      <RadioButton.Group
        onValueChange={newValue => changeLng(newValue)}
        value={value}>
        <ScrollView>
          {filteredDataSource?.map((item, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{marginRight: '3%'}}>
                <CountryFlag isoCode={item == 'en' ? 'gb' : item} size={18} />
              </View>
              <View style={{width: '95%'}}>
                <RadioButton.Item
                  label={languagesList[item].nativeName}
                  value={item}
                  onValueChange={() => changeLng(item)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </RadioButton.Group>
    </View>
  );
};

export default LanguageIndex;
