import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';
import { Button, IconButton, useTheme, Searchbar, Avatar, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useGetAllJobsQuery } from '../../../redux/reducers/jobs/jobThunk';
import JobsCardsSkeleton from '../../../skeleton/JobsCards';
import moment from 'moment';
import { useSelector } from 'react-redux';

const FreeflexerHomeScreen = ({ route }) => {
  const currentLoginUser = useSelector(state=>state.user.currentLoginUser)
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();

  const {
    data,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllJobsQuery({freeflexerId:currentLoginUser.id, filters: route.params?.filters});
  useEffect(() => {
    if (route.params?.filters) {
      refetch()
    }
  }, [])

  const RenderItem = ({ item }) => {
  const getAvatarSource = () => {
    if (item.business?.photos && item.business.photos.length > 0) {
      return { uri: item.business.photos[0] };
    } else {
      return require('../../../assets/profilepic.png');
    }
  };
    return (
      <Card
        key={item.id}
        style={{
          backgroundColor: theme.colors.background,
          margin: "2%",
          borderRadius: 5,
          padding: "3%"
        }}

      >
        <Card.Content>
          <Text style={{ color: theme.colors.placeholder, fontSize: 12 }}>{moment(item.availability?.from).format("dddd, D MMMM")} </Text>

        </Card.Content>
        <Card.Title
          title={item.business?.name}
          subtitle={`${moment(item.availability?.from).format("hh:mm")}-${moment(item.availability?.to).format("hh:mm")}`}
          left={(props) => <Avatar.Image {...props} source={getAvatarSource()} />}
          right={(props) => (
            <IconButton
              {...props}
              icon="bookmark-multiple-outline"
              iconColor={theme.colors.primary}
              onPress={() => { }}
            />
          )}

        /><View
          style={{
            borderBottomColor: theme.colors.primary,
            borderBottomWidth: 1,
            marginVertical: 8,
            marginLeft: 15,
            marginRight: 15,
          }}
        />
        <Text style={{ fontWeight: 'bold', marginLeft: 15, marginTop: 11 }}>{item.title} - 2.5 km</Text>
        <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 10, justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <Text style={{ fontWeight: '700', color: theme.colors.blue }}>${item.hourlyRate}.00 / hr</Text>
            {/* <Text style={{ color: theme.colors.placeholder, fontSize: 12, marginLeft: 10 }}>Estimated $16.00/hr</Text> */}
          </View>
          <Button style={{ borderRadius: 8 }} mode="contained" onPress={() => navigation.navigate("JobDetailsScreen", { jobId: item._id })}>
            See Details
          </Button>
        </View>
      </Card>
    )
  }

  return (
    <View style={{ flex: 1, }}>
      <HomeScreenAppbar />
      <Searchbar
        placeholder="Find Company, job, people"
        placeholderTextColor={theme.colors.placeholder}
        theme={{ roundness: 0 }}
        style={{ paddingRight: 10, backgroundColor: theme.colors.background }}
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor={theme.colors.primary}
        right={() => (
          <IconButton
            onPress={() => navigation.navigate("MainJobsFilterScreen")}
            icon="filter-variant"
            iconColor="white"
            size={35}
            style={{ marginRight: 5, borderRadius: 14, backgroundColor: theme.colors.primary }}
          />
        )}
      />
      {isLoading ?

        <JobsCardsSkeleton len={[1, 2, 3, 4]} />
        :
        <FlatList
          data={data?.jobs}
          renderItem={({ item }) => <RenderItem item={item} />}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        />
      }

    </View>
  );
};

export default FreeflexerHomeScreen;
