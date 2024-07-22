import React from 'react';
import { View, ScrollView} from 'react-native';
import { Text, TextInput, Button, IconButton, useTheme, Avatar, ActivityIndicator } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useGetCurrentLoginUserQuery } from '../../../../redux/reducers/businesses/businessThunk';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('*required').label('Full Name'),
  email: Yup.string().email('Invalid email').required('*required').label('Email'),
  phoneNumber: Yup.string().required('*required').label('Phone Number'),
  dateOfBirth: Yup.string().required('*required').label('Date of Birth'),
  aboutMe: Yup.string().required('*required').label('About Me'),
  citizenNumber: Yup.string().required('*required').label('Citizen Number'),
  address: Yup.string().required('*required').label('Address'),
});

const ContractorProfile = () => {
  const theme = useTheme();

  const {
    data,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetCurrentLoginUserQuery();
  
  console.log('User data:', data, error);

  const submitHandler = async (values, actions) => {
    console.log('Form values:', values);
    // Handle form submission
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
     {
      isLoading ?
      <ActivityIndicator size={"large"} />
      :
     <ScrollView contentContainerStyle={{ padding: '4%' }}>
        <View style={{ alignItems: 'center', marginBottom: "5%", }}>
          <Avatar.Image
            source={require('../../../../assets/profilepic.png')}
            size={80}
          />
          <IconButton
            icon="pencil-outline"
            size={25}
            onPress={() => console.log('Edit Profile Picture')}
            style={{ position: 'absolute', bottom: -10, right: "28%" }}
          />
        </View>

        <Formik
          initialValues={{
            fullName: '',
            email: data?.user?.email,
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
              <Text style={{ fontWeight: 'bold' }}>Full Name</Text>
              <TextInput
                placeholder="Shen watson..."
                mode="outlined"
                style={{ marginTop: '2%' }}
                outlineColor={theme.colors.lightgrey}
                placeholderTextColor={theme.colors.placeholder}
                dense
                activeOutlineColor={theme.colors.secondary}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
              />
              {errors.fullName && touched.fullName ? (
                <Text style={{ color: theme.colors.error }}>{errors.fullName}</Text>
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
     }
    </View>
  );
};

export default ContractorProfile;
