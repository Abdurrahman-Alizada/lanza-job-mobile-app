import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import JobsDetailsAppbar from '../../../../components/Appbars/JobsDetailsAppbar';
import React, { useState } from 'react';
import { Card, useTheme, Checkbox, IconButton, Avatar, Chip, Button } from 'react-native-paper';
import { useGetJobDetailsQuery } from '../../../../redux/reducers/jobs/jobThunk';

const JobDetailsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const data = [1, 2, 3, 4, 5]; // Replace with your actual data

  const [checked, setChecked] = useState({});
  const { jobId } = route?.params;

  const chipsData = [
    'Walking with 3 plates',
    'Pour out wine',
    'Operate coffee machine',
    'Knowledge of cash registers',
    'Walking with 4 plates',
    'Cleaning up',
  ];

  const {
    data: JobDetails,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetJobDetailsQuery(jobId);

  const handleCheckboxPress = (item) => {
    setChecked((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const renderHeader = () => (
    <View>
      <Card
        style={{
          backgroundColor: theme.colors.background,
          marginTop: 30,
          marginHorizontal: 15,
          borderRadius: 5,
          padding: '3%',
        }}
      >
        <Card.Content>
          <Text style={{ color: theme.colors.placeholder, fontSize: 12 }}>
            Tuesday, 4 June
          </Text>
        </Card.Content>
        <Card.Title
          title={JobDetails?.job?.title}
          subtitle="17:00 - 1:00"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => (
            <IconButton
              {...props}
              icon="bookmark-multiple-outline"
              iconColor={theme.colors.primary}
              onPress={() => console.log("bookmark button")}
            />
          )}
        />
        <View
          style={{
            borderBottomColor: theme.colors.primary,
            borderBottomWidth: 1,
            marginVertical: 8,
            marginLeft: 15,
            marginRight: 15,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 11,
          }}
        >
          Head waiter - 2.5 km
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 15,
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: '700', color: '#0000ff' }}>$16.00/hr</Text>
            <Text
              style={{
                color: theme.colors.placeholder,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              Estimated $16.00/hr
            </Text>
          </View>
        </View>
      </Card>

      <Text style={{ color: 'black', marginLeft: 15, marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>
        Shifts
      </Text>
    </View>
  );

  const renderFooter = () => (
    <View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
          Rules and regulations
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <IconButton icon="information" size={20} color="#0000ff" />
          <View>
            <Text style={{ color: 'black' }}>The client has set a 14 days payment term.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PaymentInfo')}>
              <Text style={{ color: 'blue' }}>Learn about payment</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="clock-fast" size={20} color="#0000ff" />
          <Text style={{ color: 'black' }}>Choose to be paid within 3 business days</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="calendar-remove" size={20} color="#0000ff" />
          <Text style={{ color: 'black' }}>Cancellation policies apply (check shift for reference)</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="shield-check" size={20} color="#0000ff" />
          <Text style={{ color: 'black' }}>Free Security insurance included</Text>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
          What to expect
        </Text>
      </View>
      <View style={{ alignItems: 'center', padding: 20, marginTop: -30 }}>
        <View>
          <Text style={{ color: 'black' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker including versions of
            <TouchableOpacity onPress={() => navigation.navigate()}>
              <Text style={{ color: 'blue' }}>Read More...</Text>
            </TouchableOpacity></Text>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
          Required Skills
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 15, marginTop: -15 }}>
          {chipsData.map((item, index) => (
            <Chip
              key={index}
              style={{ marginRight: '2%', marginTop: '4%', backgroundColor: theme.colors.lightgrey }} onPress={() => console.log('Pressed')}>
              <Text style={{ color: theme.colors.backdrop }}>{item}</Text>
            </Chip>
          ))}
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
          Location
        </Text>
        <View>
          <Image style={{ width: '93%', height: 215, marginLeft: 15 }}
            source={require('../../../../assets/location.png')}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 40, justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: '700', color: "black" }}>$15.00/hr for first shift</Text>
          <Text style={{ color: '#0000ff', fontSize: 15 }}>Negotiate rate</Text>
        </View>
        <Button onPress={() => navigation.navigate('FreeFlexerTermsAndConditions')}
          style={{ borderRadius: 6, backgroundColor: theme.colors.primary, marginRight: 15, width: '40%', height: '100%' }}>
          <Text style={{ color: theme.colors.background }}>Continue</Text>
        </Button>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <JobsDetailsAppbar />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {data.map((item) => (
          <Card
            key={item}
            style={{
              backgroundColor: theme.colors.lightgrey,
              marginTop: 30,
              marginHorizontal: 15,
              borderRadius: 5,
              padding: '3%',
            }}
          >
            <Card.Title
              title="Sat, 8 June"
              subtitle="17:00 - 1:00"
              left={(props) => (
                <Checkbox
                  status={checked[item] ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxPress(item)}
                  color={theme.colors.primary}
                />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="bookmark-multiple-outline"
                  iconColor={theme.colors.primary}
                  onPress={() => { }}
                />
              )}
            />
            <View
              style={{
                borderBottomColor: theme.colors.placeholder,
                borderBottomWidth: 1,
                marginVertical: 8,
                marginLeft: 15,
                marginRight: 15,
              }}
            />
            <Text
              style={{
                color: theme.colors.placeholder,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              Cancel at least 24 hours in advance
            </Text>
          </Card>
        ))}
        {renderFooter()}
      </ScrollView>
    </View>
  );
};

export default JobDetailsScreen;
