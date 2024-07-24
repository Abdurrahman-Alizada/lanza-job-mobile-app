import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, IconButton, useTheme, Appbar, Icon, TextInput } from 'react-native-paper';
import { CheckBox, Slider } from '@rneui/themed';
// import Icon from 'react-native-vector-icons/FontAwesome5'

const MainJobsFilterScreen = ({ navigation }) => {
    const theme = useTheme();

    const [availability, setAvailability] = useState('Anytime');
    const [distance, setDistance] = useState(0);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

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

    const languages = [
        {
            value: "English",
            heading: "English",
            description: "English only"
        },
        {
            value: "Dutch",
            heading: "Dutch",
            description: "Dutch only"
        }
    ];

    const viewResultHandler = () => {
        const filters = `tags=${selectedTags}&applicantCounts=${selectedApplicantsCount}&languages=${selectedLanguages}&hourlyRate=${hourlyRate[0]}-${hourlyRate[1]}&distance=${distance}`;
        navigation.replace("FreeflexerHomeScreen", { filters });
    }

    const handleTagToggle = (tagValue) => {
        if (selectedTags.includes(tagValue)) {
            setSelectedTags(selectedTags.filter((value) => value !== tagValue));
        } else {
            setSelectedTags([...selectedTags, tagValue]);
        }
    };

    const handleLanguageToggle = (languageValue) => {
        if (selectedLanguages.includes(languageValue)) {
            setSelectedLanguages(selectedLanguages.filter((value) => value !== languageValue));
        } else {
            setSelectedLanguages([...selectedLanguages, languageValue]);
        }
    };

    const clearFilters = () => {
        setAvailability('Anytime');
        setDistance(0);
        setHourlyRate([0,50]);
        setSelectedLanguages([]);
    };
    const [hourlyRate, setHourlyRate] = useState([0, 50]);

    const handleSliderChange = (index, value) => {
      let newHourlyRate = [...hourlyRate];
  
      if (index === 0) {
        newHourlyRate[0] = value;
        if (value > newHourlyRate[1]) {
          newHourlyRate[1] = value;
        }
      } else {
        newHourlyRate[1] = value;
        if (value < newHourlyRate[0]) {
          newHourlyRate[0] = value;
        }
      }
  
      setHourlyRate(newHourlyRate);
    };
  
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Appbar.Header style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconButton icon="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filter</Text>
                <TouchableOpacity onPress={clearFilters} style={{ marginRight: "5%" }}>
                    <Text style={{ fontSize: 16, color: 'blue' }}>Clear</Text>
                </TouchableOpacity>
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Competition</Text>

                <View style={{ backgroundColor: theme.colors.lightgrey, padding: 15, borderRadius: 6, marginBottom: 25 }}>
                    {applicantsCount.map((count, index) => (
                        <TouchableOpacity
                            onPress={() => setSelectedApplicantsCount(count)}
                            key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <CheckBox
                                center
                                containerStyle={{ backgroundColor: theme.colors.lightgrey }}
                                onPress={() => setSelectedApplicantsCount(count)}
                                checked={selectedApplicantsCount === count ? true : false}
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

                            <CheckBox
                                center
                                checked={selectedTags.includes(tag.value) ? true : false}
                                containerStyle={{ backgroundColor: theme.colors.lightgrey }}
                                onPress={() => handleTagToggle(tag.value)}
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

                        <Slider
                            value={distance}
                            maximumValue={100}
                            minimumValue={0}
                            step={1}
                            thumbStyle={{ backgroundColor: 'white', height: 25, width: 25 }}
                            thumbTintColor={'white'}
                            maximumTrackTintColor={theme.colors.placeholder}
                            minimumTrackTintColor={theme.colors.primary}
                            onValueChange={(value) => setDistance(value)}
                        />

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
                <View style={{ marginBottom: 16, backgroundColor:theme.colors.lightgrey,borderRadius:5, padding:"3%" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Hourly rate</Text>
                    <View style={{
                        backgroundColor: theme.colors.lightgrey,
                        padding: 15,
                        borderRadius: 6,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: theme.colors.placeholder }}>Min ${hourlyRate[0]} - Max ${hourlyRate[1]}</Text>
                    </View>

                    <Slider
                        value={hourlyRate[0]}
                        onValueChange={(value) => handleSliderChange(0, value)}
                        minimumValue={0}
                        maximumValue={50}
                        step={1}
                        thumbTintColor={theme.colors.onBackground}
                        thumbStyle={{height: 25, width: 25,backgroundColor:"white"}}
                        maximumTrackTintColor={theme.colors.placeholder}
                        minimumTrackTintColor={theme.colors.primary}
                    />
                    <Slider
                        value={hourlyRate[1]}
                        onValueChange={(value) => handleSliderChange(1, value)}
                        minimumValue={0}
                        maximumValue={50}
                        step={1}
                        thumbTintColor={theme.colors.onBackground}
                        thumbStyle={{height: 25, width: 25,backgroundColor:"white"}}
                        maximumTrackTintColor={theme.colors.placeholder}
                        minimumTrackTintColor={theme.colors.primary}
                    />
                </View>

                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Language</Text>
                    {languages.map((language, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleLanguageToggle(language.value)}
                            style={{ backgroundColor: theme.colors.lightgrey, padding: 15, borderRadius: 6, marginBottom: 25 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <CheckBox
                                    center
                                    checked={selectedLanguages.includes(language.value)}
                                    containerStyle={{ backgroundColor: theme.colors.lightgrey }}
                                    onPress={() => handleLanguageToggle(language.value)}
                                />
                                <View style={{ marginLeft: 8 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{language.heading}</Text>
                                    <Text style={{ fontSize: 14, color: '#777' }}>{language.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: "8%", backgroundColor: theme.colors.background }}>
                <Button mode="contained" onPress={viewResultHandler} style={{ width: '100%', borderRadius: 30 }}>
                    View Results
                </Button>
            </View>
        </View>
    );
};

export default MainJobsFilterScreen;
