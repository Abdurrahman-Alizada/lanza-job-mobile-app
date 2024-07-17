import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Text, useTheme, Card, Button, Divider, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSearhBusinessQuery, useGetAllUserBusinessesQuery, useCreateUserBusinessMutation } from '../../../../redux/reducers/businesses/businessThunk';
import { useSelector } from 'react-redux';

const CreateBusiness = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState({});
    const currentLoginUser = useSelector(state => state.user.currentLoginUser);

    const { data: userBusinessesData } = useGetAllUserBusinessesQuery(currentLoginUser.id);

    const { data: filteredData = [], error, isLoading } = useSearhBusinessQuery(query, {
        skip: !query,
    });
    const [createUserBusiness, { isLoading: CreateBusinessLoading, error: businessError }] =
        useCreateUserBusinessMutation();


    const handleInputChange = (text) => {
        setQuery(text);
    };

    const handleSelectItem = (item) => {
        setQuery(item.name);
        setSelectedItem(item);
    };

    const handleSearchAnotherBusiness = () => {
        setQuery('');
        setSelectedItem({});
    };

    const isBusinessOwned = (businessId) => {
        return userBusinessesData?.businesses.some((business) => business.id === businessId);
    };

    const AddBusiness = () => {

        const newUserBusiness = {
            id: selectedItem.id,
            contractorId: currentLoginUser.id,
            docs: selectedItem.docs,
            address: selectedItem.address,
            photos: selectedItem.photos,
            description: selectedItem.description,
            name: selectedItem.name,
            users: selectedItem.users,
            nameOnInvoice: selectedItem.nameOnInvoice,
            paymentDetails: selectedItem.paymentDetails,
            invoiceAddress: selectedItem.invoiceAddress,
            invoices: selectedItem.invoices
        }


        createUserBusiness(newUserBusiness).then((res) => {
            navigation.goBack()
        })
    }
    return (
        <View style={{ padding: "3%", backgroundColor: theme.colors.background, flex: 1 }}>
            {selectedItem.name ? (
                <Card>
                    <Card.Content>
                        <Text variant="titleLarge">{selectedItem.name}</Text>
                        <Text variant="bodyMedium">{selectedItem.description}</Text>
                        <View style={{ marginTop: "4%", alignItems: "center", flexDirection: "row" }}>
                            <Icon source="map-marker-outline" size={20} />
                            <Text variant="bodyLarge" style={{}}>{selectedItem.address}</Text>
                        </View>
                    </Card.Content>
                    <Divider style={{ marginVertical: "3%" }} />
                    <Button loading={CreateBusinessLoading} disabled={CreateBusinessLoading} onPress={AddBusiness} mode="contained" style={{ margin: "2%" }}>Add this as your business</Button>
                    <Button mode="outlined" style={{ margin: "2%" }} onPress={handleSearchAnotherBusiness}>Search for another business</Button>
                </Card>
            ) : (
                <View>
                    <TextInput
                        placeholder="Enter your business name"
                        value={query}
                        onChangeText={handleInputChange}
                        mode="outlined"
                        activeOutlineColor={theme.colors.lightBackground}
                        outlineColor={theme.colors.lightBackground}
                        style={{
                            marginBottom: 10,
                            backgroundColor: theme.colors.background,
                            caretColor: 'black'
                        }}
                        theme={{ colors: { text: theme.colors.placeholder, primary: theme.colors.placeholder } }}
                    />
                    {isLoading && <Text>Loading...</Text>}
                    {error && <Text>Error fetching data</Text>}
                    <FlatList
                        data={filteredData.businesses}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ marginTop: "5%" }}>Nothing to show</Text>
                            </View>
                        )}
                        renderItem={({ item }) => {
                            const owned = isBusinessOwned(item.id);
                            return (
                                <TouchableOpacity
                                    onPress={() => !owned && handleSelectItem(item)}
                                    style={{ padding: "3%", }}
                                    disabled={owned}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        {owned && <Icon source={"check"} color={theme.colors.blue} />}
                                        <Text style={{ marginLeft: owned ? "2%" : 0, color: owned ? theme.colors.placeholder : theme.colors.onBackground, fontWeight: "bold" }}>{item.name}</Text>
                                    </View>
                                    <Text style={{ color: owned ? theme.colors.placeholder : theme.colors.onBackground, fontWeight: "200" }}>{item.address}</Text>
                                    <Divider style={{ marginVertical: "1%" }} />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default CreateBusiness;
