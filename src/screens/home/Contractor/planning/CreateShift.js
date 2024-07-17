import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, TextInput, Button, IconButton, useTheme, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';

const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('*required').label('Company Name'),
    email: Yup.string().email('Invalid email').required('*required').label('Email'),
    phoneNumber: Yup.string().required('*required').label('Phone Number'),
    dateOfBirth: Yup.string().required('*required').label('Date of Birth'),
    aboutMe: Yup.string().required('*required').label('About Me'),
    citizenNumber: Yup.string().required('*required').label('Citizen Number'),
    address: Yup.string().required('*required').label('Address'),
});

const CreateShift = () => {
    const theme = useTheme();
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const navigation = useNavigation();

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date, setFieldValue) => {
        setFieldValue('dateOfBirth', date.toLocaleDateString());
        setDate(date);
        hideDatePicker();
    };

    const submitHandler = async (values, actions) => {
        console.log('Form values:', values);
        // Handle form submission
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ padding: '4%' }}>

                <Formik
                    initialValues={{
                        companyName: '',
                        email: '',
                        phoneNumber: '',
                        dateOfBirth: '',
                        aboutMe: '',
                        citizenNumber: '',
                        address: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        submitHandler(values, actions);
                    }}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Company Name</Text>
                            <TextInput
                                placeholder="Shen watson..."
                                mode="outlined"
                                style={{ marginTop: '2%' }}
                                outlineColor={theme.colors.lightgrey}
                                placeholderTextColor={theme.colors.placeholder}
                                dense
                                activeOutlineColor={theme.colors.secondary}
                                value={values.companyName}
                                onChangeText={handleChange('companyName')}
                                onBlur={handleBlur('companyName')}
                                right={<TextInput.Icon icon={"chevron-right"} />
                                }
                            />
                            {errors.companyName && touched.companyName ? (
                                <Text style={{ color: theme.colors.error }}>{errors.companyName}</Text>
                            ) : null}

                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Email</Text>
                            <TextInput
                                placeholder="watson@gmail.com"
                                mode="outlined"
                                style={{ marginTop: '2%' }}
                                outlineColor={theme.colors.lightgrey}
                                placeholderTextColor={theme.colors.placeholder}
                                dense
                                activeOutlineColor={theme.colors.secondary}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {errors.email && touched.email ? (
                                <Text style={{ color: theme.colors.error }}>{errors.email}</Text>
                            ) : null}

                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Phone Number</Text>
                            <TextInput
                                placeholder="+44123456789"
                                mode="outlined"
                                style={{ marginTop: '2%' }}
                                outlineColor={theme.colors.lightgrey}
                                placeholderTextColor={theme.colors.placeholder}
                                dense
                                activeOutlineColor={theme.colors.secondary}
                                value={values.phoneNumber}
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                            />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <Text style={{ color: theme.colors.error }}>{errors.phoneNumber}</Text>
                            ) : null}

                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Date of Birth</Text>
                            <TouchableOpacity onPress={showDatePicker}>
                                <TextInput
                                    placeholder="01/01/2000"
                                    mode="outlined"
                                    style={{ marginTop: '2%' }}
                                    outlineColor={theme.colors.lightgrey}
                                    placeholderTextColor={theme.colors.placeholder}
                                    dense
                                    activeOutlineColor={theme.colors.secondary}
                                    value={values.dateOfBirth}
                                    editable={false}
                                    pointerEvents="none"
                                />
                            </TouchableOpacity>
                            {errors.dateOfBirth && touched.dateOfBirth ? (
                                <Text style={{ color: theme.colors.error }}>{errors.dateOfBirth}</Text>
                            ) : null}

                            <Modal
                                transparent={true}
                                animationType="slide"
                                visible={isDatePickerVisible}
                                onRequestClose={hideDatePicker}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                }}>
                                    <View style={{
                                        backgroundColor: 'white',
                                        padding: 20,
                                        borderRadius: 10,
                                    }}>
                                        <IconButton onPress={hideDatePicker} style={{ alignSelf: "flex-end" }} icon={"close"} />
                                        <DatePicker
                                            date={date}
                                            onDateChange={(newDate) => setDate(newDate)}
                                            mode="date"
                                        />

                                        <Button mode="contained" style={{ margin: "3%" }} onPress={() => handleConfirm(date, setFieldValue)}>Confirm</Button>
                                    </View>
                                </View>
                            </Modal>

                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>About Me</Text>
                            <TextInput
                                placeholder="Student, Hospitality expert"
                                mode="outlined"
                                style={{ marginTop: '2%' }}
                                outlineColor={theme.colors.lightgrey}
                                placeholderTextColor={theme.colors.placeholder}
                                dense
                                activeOutlineColor={theme.colors.secondary}
                                value={values.aboutMe}
                                onChangeText={handleChange('aboutMe')}
                                onBlur={handleBlur('aboutMe')}
                            />
                            {errors.aboutMe && touched.aboutMe ? (
                                <Text style={{ color: theme.colors.error }}>{errors.aboutMe}</Text>
                            ) : null}

                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Citizen Number</Text>
                            <TextInput
                                placeholder="123456789"
                                mode="outlined"
                                style={{ marginTop: '2%' }}
                                outlineColor={theme.colors.lightgrey}
                                placeholderTextColor={theme.colors.placeholder}
                                dense
                                activeOutlineColor={theme.colors.secondary}
                                value={values.citizenNumber}
                                onChangeText={handleChange('citizenNumber')}
                                onBlur={handleBlur('citizenNumber')}
                            />
                            {errors.citizenNumber && touched.citizenNumber ? (
                                <Text style={{ color: theme.colors.error }}>{errors.citizenNumber}</Text>
                            ) : null}

                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Where do you live?</Text>
                            <TextInput
                                placeholder="xyz, street# 02, central london"
                                mode="outlined"
                                style={{ marginTop: '2%' }}
                                outlineColor={theme.colors.lightgrey}
                                placeholderTextColor={theme.colors.placeholder}
                                dense
                                activeOutlineColor={theme.colors.secondary}
                                value={values.address}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                            />
                            {errors.address && touched.address ? (
                                <Text style={{ color: theme.colors.error }}>{errors.address}</Text>
                            ) : null}

                            <Button
                                onPress={handleSubmit}
                                style={{
                                    backgroundColor: theme.colors.primary,
                                    padding: 8,
                                    marginTop: 20,
                                    borderRadius: 8,
                                }}>
                                <Text style={{ color: theme.colors.background, fontWeight: 'bold' }}>Save</Text>
                            </Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
};

export default CreateShift;
