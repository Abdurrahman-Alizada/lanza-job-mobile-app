import React, { useState } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useTheme, Text, FAB } from 'react-native-paper';
import { height, width } from '../../GlobalStyles';
import slides from './SlidesData';
import { useNavigation } from '@react-navigation/native';

const Slide = ({ item }) => {
  const theme = useTheme();
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={item?.image}
        style={{ height: '75%', width, resizeMode: 'contain' }}
      />
      <View style={{ width: width * 0.9 }}>
        <Text
          style={{
            color: theme.colors.secondary,
            fontSize: 20,
            // fontFamily:"AlexBrush-Regular",
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 31,
          }}>
          {item?.title}
        </Text>
        <Text
          style={{
            color: theme.colors.secondary,
            textAlign: 'center',
            marginTop: '4%',
          }}>
          {item?.subTitle}
        </Text>
      </View>
    </View>
  );
};

const WelcomeSlide = ({ setGetStarted }) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../../assets/1.png')}
        style={{ height: '65%', width, resizeMode: 'contain' }}
      />
      <View style={{ width: width * 0.9, paddingHorizontal: '5%' }}>
        <Text
          style={{
            color: theme.colors.secondary,
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          Find your
        </Text>
        <Text
          style={{
            color: theme.colors.secondary,
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          Dream Job
        </Text>
        <Text
          style={{
            color: theme.colors.secondary,
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          Here!
        </Text>
        <Text>
          Explore all the most exciting job roles basedon your interest and
          study major.
        </Text>
      </View>
      <FAB
        icon="arrow-right"
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        color={theme.colors.onPrimary}
        onPress={() => setGetStarted(true)}
        theme={{ roundness: 10 }}
      />
    </View>
  );
};


const OnboardingScreen = () => {

  const theme = useTheme();

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: theme.colors.orange,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    borderColor: theme.colors.primary,
                    borderWidth: 1,
                    backgroundColor: theme.colors.primary,
                  },
                ]}
                onPress={() =>
                  navigation.navigate(
                    'WelcomeScreen'
                  )
                }>
                <Text
                  style={{
                    color: theme.colors.onPrimary,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  GET START
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={[
                  styles.btn,
                  {
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.primary,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: theme.colors.onPrimary,
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const [getStarted, setGetStarted] = useState(false);
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {!getStarted ? (
        <WelcomeSlide setGetStarted={setGetStarted} />
      ) : (
        <View>
          <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            contentContainerStyle={{ height: height * 0.65 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={slides}
            pagingEnabled
            renderItem={({ item }) => <Slide item={item} />}
          />
          <Footer />
        </View>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 100 / 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;
