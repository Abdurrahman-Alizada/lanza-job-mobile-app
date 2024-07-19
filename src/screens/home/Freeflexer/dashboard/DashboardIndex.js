import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';
import MyActionAndReminder from './MyActionAndReminder';
import HomeScreenAppbar from '../../../../components/Appbars/HomeScreenAppbar';
import ShiftList from './Shiftlist';
import { useSelector } from 'react-redux';
import { useGetAllApplyForFreeflexerQuery } from '../../../../redux/reducers/apply/applyThunk';

const FreeflexerDashboardIndex = () => {
  const theme = useTheme();
  const currentLoginUser = useSelector((state) => state.user.currentLoginUser);

  const {
    data: jobs,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllApplyForFreeflexerQuery(currentLoginUser.id);

  const [futureFilterChips, setFutureFilterChips] = useState(['All', 'Pending', 'Accepted', 'Rejected']);
  const [pastFilterChips, setPastFilterChips] = useState(['All', 'Pending', 'Accepted', 'Rejected']);
  const [selectedFutureFilterChips, setSelectedFutureFilterChips] = useState('All');
  const [selectedPastFilterChips, setSelectedPastFilterChips] = useState('All');

  const onRefresh = useCallback(() => {
    refetch(); // Trigger refetch to reload the data
  }, [refetch]);

  if (isLoading) {
    return <Text>Loading...</Text>; // You can replace this with a better loading indicator
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <HomeScreenAppbar isMainScreen={false} greetingText="Dashboard" />
      <ScrollView
        contentContainerStyle={{ padding: '5%', paddingVertical: "10%" }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={onRefresh}
          />
        }
      >
        <MyActionAndReminder />
        
        <ShiftList
          title="Future shifts"
          jobs={jobs?.futureShifts}
          filterChips={futureFilterChips}
          selectedFilterChips={selectedFutureFilterChips}
          setSelectedFilterChips={setSelectedFutureFilterChips}
        />
        <ShiftList
          title="Past shifts"
          jobs={jobs?.pastShifts}
          filterChips={pastFilterChips}
          selectedFilterChips={selectedPastFilterChips}
          setSelectedFilterChips={setSelectedPastFilterChips}
        />
      </ScrollView>
    </View>
  );
};

export default FreeflexerDashboardIndex;
