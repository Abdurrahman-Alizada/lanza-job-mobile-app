import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput, Button, IconButton, useTheme, Avatar, ActivityIndicator } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useGetCurrentLoginUserQuery } from '../../../../redux/reducers/businesses/businessThunk';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('*required').label('Full Name'),
  surName: Yup.string().required('*required').label('Sur Name'),
  email: Yup.string().email('Invalid email').required('*required').label('Email'),
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
                firstName: data?.user?.firstName,
                surName: data?.user?.surName,
                email: data?.user?.email,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                submitHandler(values, actions);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>

                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>First name</Text>
                  <TextInput
                    placeholder="John"
                    mode="outlined"
                    style={{ marginTop: '2%' }}
                    outlineColor={theme.colors.lightgrey}
                    placeholderTextColor={theme.colors.placeholder}
                    dense
                    activeOutlineColor={theme.colors.secondary}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                  {errors.firstName && touched.firstName ? (
                    <Text style={{ color: theme.colors.error }}>{errors.firstName}</Text>
                  ) : null}

<Text style={{ fontWeight: 'bold', marginTop: 10 }}>Sur name</Text>
                  <TextInput
                    placeholder="Wick"
                    mode="outlined"
                    style={{ marginTop: '2%' }}
                    outlineColor={theme.colors.lightgrey}
                    placeholderTextColor={theme.colors.placeholder}
                    dense
                    activeOutlineColor={theme.colors.secondary}
                    value={values.surName}
                    onChangeText={handleChange('surName')}
                    onBlur={handleBlur('surName')}
                  />
                  {errors.surName && touched.surName ? (
                    <Text style={{ color: theme.colors.error }}>{errors.surName}</Text>
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
