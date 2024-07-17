import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Button, useTheme } from 'react-native-paper'
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';
import { useNavigation } from '@react-navigation/native';
import { useGetAllUserBusinessesQuery } from '../../../../redux/reducers/businesses/businessThunk';
import { useSelector } from 'react-redux';

const BusinessesIndex = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const currentLoginUser = useSelector(state => state.user.currentLoginUser)


  const {
    data,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllUserBusinessesQuery(currentLoginUser.id);

  const RenderItem = ({ item }) => <TouchableOpacity
    onPress={() => navigation.navigate("ContractorBusineseseDetails", { business: item })}
    style={{
      padding: "3%",
      width: '100%',
      marginTop: "4%",
      borderRadius: 2,
      borderWidth: 0.2,
      borderColor: theme.colors.onBackground
    }}>
    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
  </TouchableOpacity>

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ContractorDashboardGeneralAppbar greetingText="Businesses" />

      <View style={{ padding: "5%", }}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateBusiness")} style={{ padding: "4%", width: "50%", borderRadius: 5, backgroundColor: theme.colors.primary }}>
          <Text style={{ color: theme.colors.onPrimary, fontWeight: "700", alignSelf: "center" }}>Create new business</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: "5%", flexWrap: "wrap", paddingVertical: "5%", flexDirection: "row", justifyContent: "space-evenly" }}>


        <FlatList
          data={data?.businesses}
          renderItem={({ item }) => <RenderItem item={item} />}
          ListEmptyComponent={() => <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text>{(isLoading || isFetching) ? "Loading" : "No business till now"}</Text></View>}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        />


      </View>

    </View>
  )
}

export default BusinessesIndex