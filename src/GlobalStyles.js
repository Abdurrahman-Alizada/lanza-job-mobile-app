import {Dimensions, StyleSheet} from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export const lightPalette = {
  background: '#fff',
  lightBackground:"#ccc",
  primary:"#7ab6d2",
  orange:'#F77A55',
  placeholder: '#9e9e9e',
  lightgrey:'#dcdcdc',
  blue:'#0000ff',
  lightBlue:"#DEF3FE"
};

export const darkPalette = {
  background: '#212121',
  orange:'#F77A55'
};

export const fontConfig = {
  // fontFamily: 'AlexBrush-Regular',
  // fontFamily: 'Gt-America',
};

export default styles;
