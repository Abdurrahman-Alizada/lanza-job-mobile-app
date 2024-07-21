import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, List, Chip, Card, Avatar, IconButton, useTheme } from 'react-native-paper';
import moment from 'moment';

const ShiftList = ({ title, jobs, filterChips, selectedFilterChips, setSelectedFilterChips }) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    const getAvatarSource = (item) => {
        if (item?.jobDetails?.business?.photos && item?.jobDetails?.business.photos.length > 0) {
            return { uri: item?.jobDetails?.business?.photos[0] };
        } else {
            return require('../../../../assets/profilepic.png');
        }
    };

    // Filter jobs based on selected filter chip
    const filteredJobs = jobs?.filter(job => {
        if (selectedFilterChips === 'All') return true;
        return job.status === selectedFilterChips.toLowerCase();
    });

    // Get status color and text
    const getStatusTag = (status) => {
        switch (status) {
            case 'pending':
                return { text: 'Pending', color: 'orange' };
            case 'accepted':
                return { text: 'Accepted', color: 'green' };
            case 'rejected':
                return { text: 'Rejected', color: 'red' };
            case 'cancelled':
                return { text: 'Cancelled', color: 'grey' };
            default:
                return { text: 'Unknown', color: 'blue' };
        }
    };

    return (
        <View style={{ backgroundColor: theme.colors.lightgrey, borderRadius: 6, marginTop: 20 }}>
            <List.Accordion style={{
                backgroundColor: theme.colors.lightgrey,
                borderBottomStartRadius: expanded ? 0 : 6,
                borderBottomEndRadius: expanded ? 0 : 6,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6
            }}
                title={title}
                titleStyle={{ color: theme.colors.onBackground, fontWeight: 'bold' }}
                expanded={expanded}
                onPress={handlePress}>
                <View style={{ borderBottomColor: theme.colors.placeholder, borderBottomWidth: 1 }} />

                <View style={{ flexDirection: 'row', padding: '2%', flexWrap: 'wrap' }}>
                    {filterChips.map((item, index) => (
                        <Chip
                            style={{
                                marginTop: '4%', marginRight: '4%', borderRadius: 15,
                                backgroundColor: item === selectedFilterChips ? 'blue' : '#c0c0c0',
                            }}
                            textStyle={{ color: item === selectedFilterChips ? 'white' : 'black' }}
                            key={index}
                            onPress={() => setSelectedFilterChips(item)}
                        >
                            {item}
                        </Chip>
                    ))}
                </View>

                {filteredJobs.length > 0 ? (
                    filteredJobs.map((item) => {
                        const { text, color } = getStatusTag(item.status);

                        return (
                            <Card
                                key={item._id}
                                style={{
                                    backgroundColor: theme.colors.background,
                                    margin: "2%",
                                    borderRadius: 5,
                                    padding: "3%"
                                }}
                            >
                                <Card.Content>
                                    <Text style={{ color: theme.colors.placeholder, fontSize: 12 }}>
                                        {moment(item?.jobDetails?.availability?.from).format("dddd, D MMMM")}
                                    </Text>
                                </Card.Content>
                                <Card.Title
                                    title={item?.jobDetails?.business?.name}
                                    subtitle={`${moment(item.jobDetails?.availability?.from).format("hh:mm")}-${moment(item.jobDetails?.availability?.to).format("hh:mm")}`}
                                    left={(props) => <Avatar.Image {...props} source={getAvatarSource(item)} />}
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
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    marginHorizontal: 15,
                                    marginTop: 10,
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}>
                                    <Text style={{ fontWeight: 'bold',  }}>
                                        {item.jobDetails?.title} - 2.5 km
                                    </Text>
                                    <Chip
                                        style={{
                                            backgroundColor: color,
                                            borderRadius: 15,
                                        }}
                                        textStyle={{ color: 'white' }}
                                    >
                                        {text}
                                    </Chip>
                                </View>
                            </Card>
                        );
                    })
                ) : (
                    <Text style={{ marginVertical: "4%", textAlign: 'center', color: theme.colors.placeholder }}>
                        No {title.toLowerCase()}
                    </Text>
                )}
            </List.Accordion>
        </View>
    );
}

export default ShiftList;
