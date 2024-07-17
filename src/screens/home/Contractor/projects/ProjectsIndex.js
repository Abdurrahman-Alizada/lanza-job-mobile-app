import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useGetAllProjectsQuery } from '../../../../redux/reducers/projects/projectThunk';

const ProjectIndex = () => {
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
  } = useGetAllProjectsQuery(currentLoginUser.id);
  const RenderItem = ({ item }) => <TouchableOpacity
    onPress={() => navigation.navigate("ProjectDetail", { project: item })}
    style={{
      padding: "3%",
      width: '100%',
      marginTop: "4%",
      borderRadius: 2,
      borderWidth: 0.3,
      borderRadius:3,
      borderColor: theme.colors.onBackground
    }}>
    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item?.business?.name} / <Text style={{fontWeight:"300"}}> {item?.name}</Text></Text>
    <Text style={{marginTop:"3%"}}>5 jobs</Text>
  </TouchableOpacity>

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ContractorDashboardGeneralAppbar greetingText="Projects" />

      <View style={{ padding: "5%", }}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateProject")} style={{ padding: "4%", width: "50%", borderRadius: 5, backgroundColor: theme.colors.primary }}>
          <Text style={{ color: theme.colors.onPrimary, fontWeight: "700", alignSelf: "center" }}>Create new project</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex:1, padding: "5%",}}>


        <FlatList
          data={data?.projects}
          renderItem={({ item }) => <RenderItem item={item} />}
          ListEmptyComponent={() => <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text>{(isLoading || isFetching) ? "Loading" : "No business till now"}</Text></View>}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        />

      </View>

    </View>
  )
}

export default ProjectIndex