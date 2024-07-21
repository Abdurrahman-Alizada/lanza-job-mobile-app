import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView, Modal, FlatList, Image } from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useGetAllProjectsQuery } from '../../../../redux/reducers/projects/projectThunk';
import { useSelector } from 'react-redux';
import { useCreateJobMutation } from '../../../../redux/reducers/jobs/jobThunk';
import { launchImageLibrary } from 'react-native-image-picker';
import Shift from './Shifts'; 

const CreateJob = ({ navigation }) => {
    const currentLoginUser = useSelector(state => state.user.currentLoginUser);
    const theme = useTheme();

    const [logo, setLogo] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProject, setSelectedBusiness] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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

    const [shifts, setShifts] = useState([]);

    const handleAddShift = (newShift) => {
        setShifts([...shifts, newShift]);
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.fileName || 'image.jpg',
        });
        formData.append('upload_preset', 'lanzajob-jobImages'); 
        formData.append('folder', "lanzajob-jobImages"); // Specify the folder

        try {

            const response = await fetch('https://api.cloudinary.com/v1_1/dblhm3cbq/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.secure_url; // Cloudinary URL
        } catch (error) {
            console.error('Image upload failed', error);
            throw new Error('Image upload failed');
        }
    };

    const handleCreateJob = async (values) => {
        if (selectedProject) {
            try {
                let jobImageUrl = '';
                if (logo) {
                    jobImageUrl = await uploadImage(logo);
                }

                const newJob = {
                    ...values,
                    project: selectedProject._id,
                    business: selectedProject.business?._id,
                    contractorId: currentLoginUser.id,
                    availability: {
                        from: startDate,
                        to: endDate,
                    },
                    jobImage: jobImageUrl,
                    shifts
                };

                await createJob(newJob).then((res) => {
                    console.log("res is", res)
                    navigation.goBack();
                });
            } catch (error) {
                console.error('Failed to create job', error);
                alert('Failed to create job');
            }
        } else {
            alert('Please select a business.');
        }
    };

    const handleChooseLogo = () => {
        const options = {
            noData: true,
        };
        launchImageLibrary(options, (response) => {
            if (response.assets[0]?.uri) {
                setLogo(response.assets[0]);
            }
        });
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
            <ScrollView>

                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 150,
                    backgroundColor: theme.colors.lightBackground,
                    borderRadius: 8,
                    marginBottom: 20
                }} onPress={handleChooseLogo}>

                    {logo ? (
                        <Image source={{ uri: logo.uri }} style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 8,
                        }} />
                    ) : (
                        <Text style={{
                            color: theme.colors.onBackground,
                            fontSize: 18,
                        }}>Upload Image</Text>
                    )}
                </TouchableOpacity>

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

                <Shift existingShifts={shifts} onAddShift={handleAddShift} />

                <Formik
                    initialValues={{
                        title: '',
                        numberOfPeople: '',
                        hourlyRate: '',
                        cancellationPolicy: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleCreateJob}
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
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Date & Time (From)</Text>
                                <TouchableOpacity
                                    onPress={() => setShowStartDatePicker(true)}
                                    style={{
                                        padding: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Text>{startDate.toString()}</Text>
                                </TouchableOpacity>
                                {showStartDatePicker && (
                                    <DatePicker
                                        modal
                                        open={showStartDatePicker}
                                        date={startDate}
                                        onConfirm={date => {
                                            setShowStartDatePicker(false);
                                            setStartDate(date);
                                        }}
                                        onCancel={() => {
                                            setShowStartDatePicker(false);
                                        }}
                                    />
                                )}
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Date & Time (To)</Text>
                                <TouchableOpacity
                                    onPress={() => setShowEndDatePicker(true)}
                                    style={{
                                        padding: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Text>{endDate.toString()}</Text>
                                </TouchableOpacity>
                                {showEndDatePicker && (
                                    <DatePicker
                                        modal
                                        open={showEndDatePicker}
                                        date={endDate}
                                        onConfirm={date => {
                                            setShowEndDatePicker(false);
                                            setEndDate(date);
                                        }}
                                        onCancel={() => {
                                            setShowEndDatePicker(false);
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
                                contentStyle={{ padding: "2%", alignItems: 'center' }}
                            >
                                Publish Job
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
                        renderItem={({ item }) => <RenderItem item={item} />}
                        ListEmptyComponent={() => (
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text>{isLoading ? 'Loading...' : 'No businesses found'}</Text>
                            </View>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default CreateJob;
