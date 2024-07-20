import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import { Button, TextInput, useTheme } from 'react-native-paper';
import moment from 'moment';

const Shift = ({ existingShifts, onAddShift }) => {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [shifts, setShifts] = useState(existingShifts || []);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startTime, setStartDate] = useState(new Date());
    const [endTime, setEndDate] = useState(new Date());

    const validationSchema = Yup.object().shape({
        hourlyRate: Yup.number().required('Hourly rate is required').positive('Hourly rate must be positive'),
    });

    const formik = useFormik({
        initialValues: {
            hourlyRate: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const newShift = {
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                hourlyRate: values.hourlyRate,
                applicationsCount: 0,
            };
            setShifts([...shifts, newShift]);
            setModalVisible(false);
            onAddShift(newShift); 
        },
    });

    return (
        <View style={{ flex: 1 }}>
            {
                shifts.map((item, index) => (
                    <View key={index} style={styles.shiftItem}>
                        <Text>Start Date: {moment(item.startTime).format("DD-MM-YYYY hh:mm A")}</Text>
                        <Text>End Date: {moment(item.endTime).format("DD-MM-YYYY hh:mm A")}</Text>
                        <Text>Hourly Rate: ${item.hourlyRate}</Text>
                    </View>
                ))
            }
            <TouchableOpacity
                style={{
                    backgroundColor: theme.colors.primary,
                    padding: 15,
                    borderRadius: 5,
                    marginVertical: 20,
                    alignItems: 'center',
                }}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Add Shift</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <View style={{
                    flex: 1,
                    paddingVertical: "20%",
                    paddingHorizontal: "5%",
                    backgroundColor: theme.colors.background
                }}>
                    <Text style={styles.modalTitle}>Add Shift</Text>

                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.datePickerText}>Start Date: {startTime.toDateString()}</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                        <DatePicker
                            modal
                            open={showStartDatePicker}
                            date={startTime}
                            onConfirm={date => {
                                setShowStartDatePicker(false);
                                setStartDate(date);
                            }}
                            onCancel={() => setShowStartDatePicker(false)}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.datePickerText}>End Date: {endTime.toDateString()}</Text>
                    </TouchableOpacity>
                    {showEndDatePicker && (
                        <DatePicker
                            modal
                            open={showEndDatePicker}
                            date={endTime}
                            onConfirm={date => {
                                setShowEndDatePicker(false);
                                setEndDate(date);
                            }}
                            onCancel={() => setShowEndDatePicker(false)}
                        />
                    )}

                    <TextInput
                        placeholder="Hourly Rate"
                        style={{ marginBottom: "3%" }}
                        mode="outlined"
                        keyboardType="numeric"
                        dense
                        outlineColor={theme.colors.placeholder}
                        onChangeText={formik.handleChange('hourlyRate')}
                        onBlur={formik.handleBlur('hourlyRate')}
                        value={formik.values.hourlyRate}
                    />
                    {formik.touched.hourlyRate && formik.errors.hourlyRate && <Text style={styles.errorText}>{formik.errors.hourlyRate}</Text>}

                    <Button style={{ marginTop: "3%" }} mode="contained" onPress={formik.handleSubmit}>Submit</Button>
                    <Button style={{ marginTop: "3%" }} onPress={() => setModalVisible(false)}>Close</Button>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    shiftItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    datePickerText: {
        color: '#333',
    },
});

export default Shift;
