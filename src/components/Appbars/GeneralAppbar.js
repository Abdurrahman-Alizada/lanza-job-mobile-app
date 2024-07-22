
import { useTranslation } from 'react-i18next';
import { Appbar, Text, useTheme } from 'react-native-paper';

export default function GeneralAppbar({ navigation, back, title }) {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}  >
      {/* {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null} */}
      <Appbar.BackAction onPress={()=>navigation?.goBack()} />
      {/* <Appbar.Content title={t(title)} /> */}
      <Text style={{ fontSize: 16, fontWeight: "800" }}>{t(title)}</Text>
   
    </Appbar.Header>
  );
}