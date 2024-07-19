import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';

export default function CustomNavigationBar() {
  const navigation = useNavigation();
 const theme= useTheme();

  return (
      <Appbar.Header
        style={{flexDirection:'row', backgroundColor: theme.colors.background}}>
        
        <View style={{alignItems: 'center', width: '33%'}}>
         <Appbar.BackAction
              style={{alignSelf: 'flex-start'}}
              onPress={() => navigation.goBack()}
            />
          
           </View>
        <View style={{width: '33%'}}>
          <Image 
            style={{
              width: 100,
              height: 50,
              resizeMode: "contain"
            }}
            source={require('../../assets/logob.png')}
          />
        </View>

       </Appbar.Header>
  );
}
