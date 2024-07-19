import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useGetAllProjectsQuery } from '../../../../redux/reducers/projects/projectThunk';
import { useSelector } from 'react-redux';
import { useCreateJobMutation } from '../../../../redux/reducers/jobs/jobThunk';

const CreateShift = ({ navigation }) => {
    const currentLoginUser = useSelector(state => state.user.currentLoginUser);
    const theme = useTheme();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProject, setSelectedBusiness] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [autoAcceptFlexpools, setAutoAcceptFlexpools] = useState(false);
    const [autoAcceptRegulars, setAutoAcceptRegulars] = useState(false);
    const [smartPricing, setSmartPricing] = useState(false);
    const { data, isLoading } = useGetAllProjectsQuery(currentLoginUser.id);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        numberOfPeople: Yup.string().required('Number of people is required'),
        hourlyRate: Yup.string().required('Hourly rate is required'),
        cancellationPolicy: Yup.string().required('Cancellation policy is required'),
    });

    const [createJob, { isLoading: createJobLoading }] = useCreateJobMutation();

    const handleCreateShift = async (values) => {
        console.log("first create")
        if (selectedProject) {
            const newProject = { ...values, project: selectedProject._id, business: selectedProject.business?._id, contractorId: currentLoginUser.id }
            await createJob(newProject).then((res) => {
                // console.log("job", res)
                navigation.goBack();
            });
        } else {
            alert('Please select a business.');
        }
    };


    const RenderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setSelectedBusiness(item);
                setModalVisible(false);
            }}
            style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
            }}
        >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item?.business?.name} / <Text style={{ fontWeight: "300" }}> {item?.name}</Text></Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: "5%", backgroundColor: theme.colors.background }}>

            <ScrollView style={{}}>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginVertical: "5%" }}>
                    <Text style={{
                        marginBottom: 5,
                        color: '#333',
                        fontWeight: 'bold',
                    }}>Business / project</Text>
                    <Text style={{
                        padding: 15,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        backgroundColor: '#fff',
                    }}>{selectedProject ? selectedProject.name : 'Select Business'}</Text>
                </TouchableOpacity>

                <Formik
                    initialValues={{
                        title: '',
                        numberOfPeople: '',
                        hourlyRate: '',
                        cancellationPolicy: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleCreateShift}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Title</Text>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#fff',
                                    }}
                                    placeholder="Title"
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />
                                {touched.title && errors.title && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>{errors.title}</Text>
                                )}
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Date & Time</Text>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(true)}
                                    style={{
                                        padding: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Text>{date.toString()}</Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DatePicker
                                        modal
                                        open={showDatePicker}
                                        date={date}
                                        onConfirm={date => {
                                            setShowDatePicker(false);
                                            setDate(date);
                                        }}
                                        onCancel={() => {
                                            setShowDatePicker(false);
                                        }}
                                    />
                                )}
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Number of people</Text>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#fff',
                                    }}
                                    placeholder="Enter number of people"
                                    onChangeText={handleChange('numberOfPeople')}
                                    onBlur={handleBlur('numberOfPeople')}
                                    value={values.numberOfPeople}
                                />
                                {touched.numberOfPeople && errors.numberOfPeople && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>{errors.numberOfPeople}</Text>
                                )}
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Hourly rate</Text>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#fff',
                                    }}
                                    placeholder="$0.00"
                                    onChangeText={handleChange('hourlyRate')}
                                    onBlur={handleBlur('hourlyRate')}
                                    value={values.hourlyRate}
                                />
                                {touched.hourlyRate && errors.hourlyRate && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>{errors.hourlyRate}</Text>
                                )}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>Auto-accept flexpools</Text>
                                <Switch value={autoAcceptFlexpools} onValueChange={setAutoAcceptFlexpools} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>Auto-accept regulars</Text>
                                <Switch value={autoAcceptRegulars} onValueChange={setAutoAcceptRegulars} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>Smart pricing</Text>
                                <Switch value={smartPricing} onValueChange={setSmartPricing} />
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Cancellation policy</Text>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#fff',
                                    }}
                                    placeholder="Days"
                                    onChangeText={handleChange('cancellationPolicy')}
                                    onBlur={handleBlur('cancellationPolicy')}
                                    value={values.cancellationPolicy}
                                />
                                {touched.cancellationPolicy && errors.cancellationPolicy && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>{errors.cancellationPolicy}</Text>
                                )}
                            </View>

                            <Button
                                mode="contained"
                                onPress={handleSubmit}
                                contentStyle={{ padding: "2%",  alignItems: 'center' }}
                            >
                                Publish shift
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => navigation.goBack()}
                                style={{ marginTop: 10, padding: "2%", borderRadius: 5, alignItems: 'center' }}
                            >
                                Cancel
                            </Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide">
                <View style={{
                    flex: 1,
                    padding: 20,
                    backgroundColor: theme.colors.background,
                }}>
                    <IconButton
                        onPress={() => setModalVisible(false)}
                        icon="close"
                        iconColor={theme.colors.onBackground}
                        size={25}
                        style={{ alignSelf: "flex-end" }}
                    />
                    <FlatList
                        data={data?.projects}
                        renderItem={({ item }) => <RenderItem item={item} />
                        }
                        ListEmptyComponent={() => (
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text>{isLoading ? 'Loading...' : 'No businesses found'}</Text>
                            </View>
                        )} />
                </View>
            </Modal>
        </View>
    );
};

export default CreateShift;
