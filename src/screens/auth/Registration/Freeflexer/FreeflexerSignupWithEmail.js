import React, { useRef, useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView } from 'react-native';
import {
  TextInput,
  Dialog,
  Text,
  Paragraph,
  Portal,
  Button,
  useTheme,
} from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import {
  useRegisterUserMutation,
} from '../../../../redux/reducers/user/userThunk';
import AuthAppbar from "../../../../components/Appbars/AuthAbbar"; // Adjust import path as needed
import { useDispatch } from 'react-redux';
import { handleCurrentLoaginUser } from '../../../../redux/reducers/user/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('* Email is required')
    .label('Email'),
  addressLine1: Yup.string()
    .required('* Address line 1 is required')
    .label('Address line 1'),
  addressLine2: Yup.string().label('Address line 2'),
  addressLine3: Yup.string().label('Address line 3'),
  postCode: Yup.string().label('Post code'),
  city: Yup.string().label('City'),
  firstName: Yup.string().label('First name'),
  surName: Yup.string().label('Sur name'),
});

const FreeflexerSignupWithEmail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showProceedButton, setShowProceedButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef('');

  const [registerUser, { isLoading: resigtrationLoading }] = useRegisterUserMutation();
  const submitHandler = async (values, { resetForm }) => {
    setIsLoading(true)
    emailRef.current = values.email;
    registerUser({
      email: values.email,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      addressLine3: values.addressLine3,
      postCode: values.postCode,
      city: values.city,
      firstName: values.firstName,
      surName: values.surName,
    }).then((res) => {
      if (res.error) {
        setMessage(res.error?.data?.message || 'Registration error');
        setVisible(true);
      } else if (res.data?.freeflexer) {
        setMessage("User created successfully");
        setShowProceedButton(true);
        setVisible(true);
        resetForm()
        let user1 = res.data?.freeflexer
        user1.applicantId = res.data?.onfido?.id
        dispatch(handleCurrentLoaginUser(user1))
        AsyncStorage.setItem("userId", res.data?.freeflexer?.id)
        navigation.navigate("FreeflexerCreatePassword")
      }
      setIsLoading(false)
    })

  };


  const formikRef = useRef();
  const theme = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AuthAppbar title="Sign up today. Work tomorrow" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: '5%' }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="dark-content" />

        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
            postCode: '',
            city: '',
            firstName: '',
            surName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            submitHandler(values, { resetForm });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                  <Dialog.Title>Sign up</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>{message}</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>

                    {showProceedButton && (
                      <Button onPress={() => { setVisible(false); navigation.navigate('Login'); }}>
                        Proceed further
                      </Button>
                    )}
                    <Button onPress={() => { setVisible(false); emailRef.current = ''; }}>
                      Close
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Text style={{ fontSize: 22, marginVertical: '5%', fontWeight: '700' }}>
                Sign up today. Work tomorrow
              </Text>

              <Text style={{ fontWeight: '800', marginBottom: '2%' }}>Email</Text>
              <TextInput
                placeholder="johndoe@gmail.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                mode="outlined"
                dense
                placeholderTextColor={theme.colors.placeholder}
                outlineColor={theme.colors.secondary}
              />
              {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

              <Text style={{ fontWeight: '800', marginVertical: '2%' }}>Where do you live?</Text>
              <TextInput
                placeholder="Address line 1"
                onChangeText={handleChange('addressLine1')}
                onBlur={handleBlur('addressLine1')}
                value={values.addressLine1}
                mode="outlined"
                dense
                placeholderTextColor={theme.colors.placeholder}
                outlineColor={theme.colors.secondary}
              />
              {errors.addressLine1 && touched.addressLine1 && <Text style={{ color: 'red' }}>{errors.addressLine1}</Text>}

              <TextInput
                placeholder="Address line 2"
                onChangeText={handleChange('addressLine2')}
                onBlur={handleBlur('addressLine2')}
                value={values.addressLine2}
                mode="outlined"
                dense
                placeholderTextColor={theme.colors.placeholder}
                style={{ marginTop: "2%" }}
                outlineColor={theme.colors.secondary}
              />

              <TextInput
                placeholder="Address line 3"
                onChangeText={handleChange('addressLine3')}
                onBlur={handleBlur('addressLine3')}
                value={values.addressLine3}
                mode="outlined"
                dense
                placeholderTextColor={theme.colors.placeholder}
                style={{ marginTop: "2%" }}
                outlineColor={theme.colors.secondary}
              />

              <Text style={{ fontWeight: '800', marginVertical: '2%' }}>Post code</Text>
              <TextInput
                placeholder="ER2345IO"
                onChangeText={handleChange('postCode')}
                onBlur={handleBlur('postCode')}
                value={values.postCode}
                mode="outlined"
                dense
                placeholderTextColor={theme.colors.placeholder}
                outlineColor={theme.colors.secondary}
              />

              <Text style={{ fontWeight: '800', marginVertical: '2%' }}>City</Text>
              <TextInput
                placeholder="London"
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
                mode="outlined"
                dense
                placeholderTextColor={theme.colors.placeholder}
                outlineColor={theme.colors.secondary}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontWeight: '800', marginVertical: '2%' }}>First name</Text>
                  <TextInput
                    placeholder="John"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    mode="outlined"
                    dense
                    placeholderTextColor={theme.colors.placeholder}
                    outlineColor={theme.colors.secondary}
                  />
                </View>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontWeight: '800', marginVertical: '2%' }}>Sur name</Text>
                  <TextInput
                    placeholder="Doe"
                    onChangeText={handleChange('surName')}
                    onBlur={handleBlur('surName')}
                    value={values.surName}
                    mode="outlined"
                    dense
                    placeholderTextColor={theme.colors.placeholder}
                    outlineColor={theme.colors.secondary}
                  />
                </View>
              </View>

              <Button
                // loading={isLoading || resendLoading}
                loading={isLoading}
                disabled={isLoading}
                style={{ marginTop: '8%' }}
                contentStyle={{ padding: '2%' }}
                theme={{ roundness: 1 }}
                mode="contained"
                onPress={handleSubmit}
              >
                Sign up
              </Button>
            </View>
          )}
        </Formik>

        <View style={{ marginVertical: '5%', alignItems: 'center' }}>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Main", { screen: "HomeStack" })}
            labelStyle={{ color: '#3F51B5', fontWeight: 'bold' }}
          >
            Maybe later
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default FreeflexerSignupWithEmail;
