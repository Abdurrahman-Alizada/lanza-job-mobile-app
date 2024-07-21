import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Checkbox, useTheme } from 'react-native-paper';

const ShiftCard = React.memo(({ shift, checked, onCheckboxPress }) => {
    const theme = useTheme();

    const formatDate = (date) => moment(date).format("DD-MM-YYYY");
    const formatTime = (date) => moment(date).format('HH:mm'); // 24-hour format

    return (
        <Card
        style={{
          backgroundColor: theme.colors.lightgrey,
          marginTop: 30,
          marginHorizontal: 15,
          borderRadius: 5,
          padding: '3%',
        }}
        onPress={() => onCheckboxPress(shift)}

      >
            <Card.Title
                title={formatDate(shift.startTime)}
                subtitle={`${formatTime(shift.startTime)} - ${formatTime(shift.endTime)}`}
                left={(props) => (
                    <Checkbox.Android
                        {...props}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => onCheckboxPress(shift)}
                        color={theme.colors.primary}
                    />
                )}
             
            />
            <View style={styles.divider} />
            <Text style={styles.description}>
                Cancel at least 24 hours in advance
            </Text>
        </Card>
    );
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 5,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    divider: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginVertical: 8,
        marginLeft: 15,
        marginRight: 15,
    },
    description: {
        color: '#666',
        fontSize: 12,
        marginLeft: 10,
    },
});

export default ShiftCard;
