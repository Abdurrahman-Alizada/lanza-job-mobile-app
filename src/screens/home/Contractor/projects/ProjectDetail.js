import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, useTheme, Card, Divider, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';

const ProjectDetail = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { project } = route.params;

  // const renderPhotos = (photos) => {
  //   console.log("photos",photos)
  //   return photos.map((photo, index) => (
  //     <Image
  //       key={index}
  //       source={{ uri: photo }}
  //       style={{
  //         width: 100,
  //         height: 100,
  //         borderRadius: 5,
  //         margin: 5,
  //       }}
  //     />
  //   ));
  // };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header>
           <Appbar.BackAction onPress={() => navigation.goBack()} />

           </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, color:theme.colors.primary }}>{project.name}</Text>
    
        <Button
          mode="contained"
          style={{marginTop:"5%",}}
          onPress={() => navigation.navigate('ContractorUpdateBusinesese', { business: project })}
          contentStyle={{ padding: 8, backgroundColor: theme.colors.primary }}
        >
          Edit Business
        </Button>
      </ScrollView>
    </View>
  );
};

export default ProjectDetail;
