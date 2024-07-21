import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import JobsDetailsAppbar from '../../../../components/Appbars/JobsDetailsAppbar';
import { Card, useTheme, IconButton, Avatar, Chip, Button, ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { jobApi, useGetJobDetailsQuery } from '../../../../redux/reducers/jobs/jobThunk';
import { useCreateApplyMutation } from '../../../../redux/reducers/apply/applyThunk';
import ShiftCard from './ShiftCard'; // Import the ShiftCard component

const JobDetailsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentLoginUser = useSelector(state => state.user.currentLoginUser);
  const { jobId } = route?.params;

  const [checkedShifts, setCheckedShifts] = useState([]);

  const chipsData = [
    'Walking with 3 plates',
    'Pour out wine',
    'Operate coffee machine',
    'Knowledge of cash registers',
    'Walking with 4 plates',
    'Cleaning up',
  ];

  const {
    data: item,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetJobDetailsQuery({ id: jobId, freeflexerId: currentLoginUser?.id });

  const [createApply, { isLoading: createApplyLoading }] = useCreateApplyMutation();

  const handleCheckboxPress = (shift) => {
    setCheckedShifts((prev) =>
      prev.some((s) => s._id === shift._id)
        ? prev.filter((s) => s._id !== shift._id)
        : [...prev, shift]
    );
  };

  const handleApply = async () => {
    createApply({
      jobId: item._id,
      freeflexerId: currentLoginUser.id,
      coverLetter: "This is cover letter",
      shifts: checkedShifts // Adding selected shifts to the application
    }).then((src) => {
      console.log("first",src)
      if (src?.data?.application) {
        dispatch(jobApi.util.invalidateTags(['JobDetails']));
        navigation.goBack();
      }
    });
  };

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
              style={{ marginRight: '2%', marginTop: '4%', backgroundColor: theme.colors.lightgrey }}
              onPress={() => console.log('Pressed')}>
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
    </View>
  );

  const getAvatarSource = () => {
    if (item?.business?.photos && item?.business.photos.length > 0) {
      return { uri: item?.business?.photos[0] };
    } else {
      return require('../../../../assets/profilepic.png');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <JobsDetailsAppbar />
      {isLoading ?
        <ActivityIndicator style={{ marginTop: "5%" }} />
        :
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            <Card
              style={{
                backgroundColor: theme.colors.background,
                margin: "2%",
                borderRadius: 5,
                padding: "3%"
              }}
            >
              <Card.Content>
                <Text style={{ color: theme.colors.placeholder, fontSize: 12 }}>{moment(item?.availability?.from).format("dddd, D MMMM")} </Text>
              </Card.Content>
              <Card.Title
                title={item?.business?.name}
                subtitle={`${moment(item?.availability?.from).format("hh:mm")}-${moment(item?.availability?.to).format("hh:mm")}`}
                left={(props) => <Avatar.Image {...props} source={getAvatarSource()} />}
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
                  borderBottomColor: theme.colors.primary,
                  borderBottomWidth: 1,
                  marginVertical: 8,
                  marginLeft: 15,
                  marginRight: 15,
                }}
              />
              <Text style={{ fontWeight: 'bold', marginLeft: 15, marginTop: 11 }}>{item?.title} - 2.5 km</Text>
              <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 10, justifyContent: "space-between", alignItems: "center" }}>
                {/* Additional information */}
              </View>
            </Card>

            <Text style={{ color: 'black', marginLeft: 15, marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>
              Shifts
            </Text>

            {item?.shifts?.map((shift) => (
              <ShiftCard
                key={shift._id}
                shift={shift}
                onCheckboxPress={handleCheckboxPress}
                checked={checkedShifts.some(s => s._id === shift._id)}
              />
            ))}

            {renderFooter()}
          </ScrollView>
          <View style={{ flexDirection: 'row', paddingHorizontal: "5%", paddingVertical: "10%", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{}}>
              <Text style={{ fontWeight: '700', color: "black" }}>${item?.hourlyRate} / hr for first shift</Text>
              <Text style={{ color: theme.colors.blue, fontSize: 15 }}>Negotiate rate</Text>
            </View>
            <Button
              onPress={handleApply}
              disabled={createApplyLoading || item?.isApplied}
              loading={createApplyLoading}
              contentStyle={{ padding: "2%" }}
              style={{ padding: "2%" }}
              theme={{ roundness: 20 }}
              mode="contained"
            >
              {item?.isApplied ? "Already applied" : "Apply"}
            </Button>
          </View>
        </View>
      }
    </View>
  );
};

export default JobDetailsScreen;
