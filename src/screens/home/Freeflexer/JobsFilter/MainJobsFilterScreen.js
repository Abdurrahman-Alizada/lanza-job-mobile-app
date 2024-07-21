import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Checkbox, Button, IconButton, useTheme, Icon, RadioButton, Appbar } from 'react-native-paper';
// import { Slider } from '@rneui/themed';

const MainJobsFilterScreen = ({ navigation }) => {
    const theme = useTheme();

    const [availability, setAvailability] = useState('Anytime');
    const [distance, setDistance] = useState(0);
    const [hourlyRate, setHourlyRate] = useState(0);
    const [languages, setLanguages] = useState(null);

    const [applicantsCount] = useState([0, 10, 20]);
    const [selectedApplicantsCount, setSelectedApplicantsCount] = useState([]);

    const [selectedTags, setSelectedTags] = useState([]);
    const [tags] = useState([
        {
            value: "substitution",
            heading: "Substitution",
            description: "Open again for application"
        },
        {
            value: "pastClient",
            heading: "Past client",
            description: "You've worked here before"
        },
        {
            value: "inFlexpool",
            heading: "In flexpool",
            description: "You are in a client flexpool"
        }
    ]);

    const viewResultHandler = () => {
        const filters = `tags=${selectedTags}&applicantCounts=${selectedApplicantsCount}`
        navigation.replace("FreeflexerHomeScreen", { filters })
    }

    const handleTagToggle = (tagValue) => {
        if (selectedTags.includes(tagValue)) {
            setSelectedTags(selectedTags.filter((value) => value !== tagValue));
        } else {
            setSelectedTags([...selectedTags, tagValue]);
        }
    };


    const clearFilters = () => {
        setAvailability('Anytime');
        setDistance(0);
        setHourlyRate(0);
        setLanguages(null);
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,

            }}> */}
            <Appbar.Header style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: "5%",

            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconButton icon="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filter</Text>
                <TouchableOpacity onPress={clearFilters}>
                    <Text style={{ fontSize: 16, color: 'blue' }}>Clear</Text>
                </TouchableOpacity>
            </Appbar.Header>
            {/* </View> */}
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Competition</Text>

                <View style={{ backgroundColor: theme.colors.lightgrey, padding: 15, borderRadius: 6, marginBottom: 25 }}>
                    {applicantsCount.map((count, index) => (
                        <TouchableOpacity
                            onPress={() => setSelectedApplicantsCount(count)}
                            key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Checkbox
                                status={selectedApplicantsCount === count ? 'checked' : 'unchecked'}
                            />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{count} applications</Text>
                                <Text style={{ fontSize: 14, color: '#777' }}>Shifts with maximum {count} applicantions</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Tags</Text>
                {tags.map((tag, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleTagToggle(tag.value)}
                        style={{ backgroundColor: theme.colors.lightgrey, padding: 15, borderRadius: 6, marginBottom: 25 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Checkbox
                                status={selectedTags.includes(tag.value) ? 'checked' : 'unchecked'}
                            />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{tag.heading}</Text>
                                <Text style={{ fontSize: 14, color: '#777' }}>{tag.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Availability</Text>
                    <View style={{
                        backgroundColor: theme.colors.lightgrey,
                        padding: 15,
                        borderRadius: 6,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('AvailabilityScreen')} style={{ flex: 1 }}>
                            <Text style={{ color: theme.colors.placeholder }}>From</Text>
                            <Text style={{ fontSize: 16, color: theme.colors.placeholder }}>{availability}</Text>
                        </TouchableOpacity>
                        <IconButton icon="close" size={24} color="black" />
                    </View>
                </View>

                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Categories</Text>
                    <View style={{ backgroundColor: theme.colors.lightgrey, padding: 15, borderRadius: 6 }}>
                        {['Hospitality', 'Logistics', 'Volunteer work', 'Retail', 'Promotion', 'Construction', 'Facility services'].map((category, index) => (
                            <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, marginVertical: 12 }}>
                                <Text style={{ fontSize: 16 }}>{category}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, color: '#4169e1', marginRight: 4 }}>0/17</Text>
                                    <Icon source="chevron-right" size={30} color={theme.colors.placeholder} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Location</Text>
                    <View style={{ backgroundColor: theme.colors.lightgrey, padding: 8, borderRadius: 6 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Amsterdam</Text>
                            <Icon source="chevron-right" size={30} color={theme.colors.placeholder} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 18, marginBottom: 8 }}>Distance</Text>
                            <Text style={{ color: theme.colors.placeholder }}>{distance} km</Text>
                        </View>

                        {/* <Slider
                            value={distance}
                            maximumValue={100}
                            minimumValue={0}
                            step={1}
                            thumbStyle={{ backgroundColor: 'white', height: 25, width: 25 }}
                            thumbTintColor={'white'}
                            maximumTrackTintColor={theme.colors.placeholder}
                            minimumTrackTintColor={theme.colors.primary}
                            onValueChange={(value) => setDistance(value)}
                        /> */}

                    </View>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Client</Text>
                    <View

                        style={{
                            backgroundColor: theme.colors.lightgrey,
                            padding: 15,
                            borderRadius: 6,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <Text>Search for a client</Text>
                        <Icon
                            source="chevron-right" size={30} color={theme.colors.placeholder} />

                    </View>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Hourly rate</Text>
                    <View style={{ backgroundColor: theme.colors.lightgrey, padding: 15, borderRadius: 6 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 30 }}>
                            <Text>Salary per hour</Text>
                            <Text style={{ color: theme.colors.placeholder }}>${hourlyRate.toFixed(2)}</Text>
                        </View>


                        {/* <Slider
                            value={hourlyRate}
                            maximumValue={100}
                            minimumValue={0}
                            step={1}
                            thumbStyle={{ backgroundColor: 'white', height: 25, width: 25 }}
                            thumbTintColor={'white'}
                            maximumTrackTintColor={theme.colors.placeholder}
                            minimumTrackTintColor={theme.colors.primary}
                            onValueChange={(value) => setHourlyRate(value)}
                        /> */}

                    </View>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Required languages</Text>
                    <View style={{ backgroundColor: theme.colors.lightgrey, padding: 15, borderRadius: 6 }}>
                        <RadioButton.Group onValueChange={value => setLanguages(value)} value={languages}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <RadioButton
                                    value="English"
                                    status={languages === 'English' ? 'checked' : 'unchecked'}
                                    onValueChange={() => setLanguages('English')}
                                    uncheckedColor="#000"
                                    color={theme.colors.primary}
                                />
                                <Text style={{ fontSize: 16, color: '#000' }}>English only</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <RadioButton
                                    value="Dutch"
                                    status={languages === 'Dutch' ? 'checked' : 'unchecked'}
                                    onValueChange={() => setLanguages('Dutch')}
                                    uncheckedColor="#000"
                                    color={theme.colors.primary}
                                />
                                <Text style={{ fontSize: 16, color: '#000' }}>Dutch only</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                borderRadius: 6,
                backgroundColor: theme.colors.primary,
                paddingVertical: 7,
                marginHorizontal: 15,
                marginVertical: 25
            }}>
                <Button onPress={viewResultHandler}>
                    <Text style={{ color: theme.colors.background, fontWeight: 'bold' }}>View result</Text>
                </Button>
            </View>
        </View>
    );
};

export default MainJobsFilterScreen;
