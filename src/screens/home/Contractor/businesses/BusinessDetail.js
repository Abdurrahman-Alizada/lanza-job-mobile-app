import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, useTheme, Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';

const BusinessDetail = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { business } = route.params;

  const renderPhotos = (photos) => {
    console.log("photos",photos)
    return photos.map((photo, index) => (
      <Image
        key={index}
        source={{ uri: photo }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 5,
          margin: 5,
        }}
      />
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, color:theme.colors.primary }}>{business.name}</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Address:</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{business.address}</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name on Invoice:</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{business.nameOnInvoice}</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Invoice Address:</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{business.invoiceAddress}</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Photos:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
              {renderPhotos(business.photos)}
            </View>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Created At:</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{new Date(business.createdAt).toLocaleDateString()}</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Updated At:</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{new Date(business.updatedAt).toLocaleDateString()}</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ContractorUpdateBusinesese', { business })}
          contentStyle={{ padding: 8, backgroundColor: theme.colors.primary }}
        >
          Edit Business
        </Button>
      </ScrollView>
    </View>
  );
};

export default BusinessDetail;
