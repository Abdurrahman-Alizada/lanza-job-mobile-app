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
  useResendEmailForUserRegistrationMutation,
} from '../../../../redux/reducers/user/userThunk';
import AuthAppbar from "../../../../components/Appbars/AuthAbbar"; // Adjust import path as needed

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
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const emailRef = useRef('');

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [resendEmailForUserRegistration, { isLoading: resendLoading }] = useResendEmailForUserRegistrationMutation();

  const submitHandler = async (values, formikBag) => {
    
    emailRef.current = values.email;
    try {
      const res = await registerUser({
        email: values.email,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        addressLine3: values.addressLine3,
        postCode: values.postCode,
        city: values.city,
        firstName: values.firstName,
        surName: values.surName,
      });
      if (res.error?.status === 409) {
        setMessage(res.error?.data?.message || 'Conflict');
        setShowLoginButton(false);
        setShowTryAgainButton(!res.error?.data?.verified);
        setVisible(true);
      } else if (res.data?.message === 'An Email sent to your account please verify') {
        formikBag.resetForm();
        setMessage(`An Email sent to ${emailRef.current}. Please verify and then login`);
        setShowTryAgainButton(false);
        setShowLoginButton(true);
        setVisible(true);
      } else {
        setShowTryAgainButton(true);
        setShowLoginButton(true);
        setMessage('Something went wrong');
        setVisible(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const resendEmail = () => {
    resendEmailForUserRegistration({
      email: emailRef.current,
    })
      .then(res => {
        if (res.error?.status === 409) {
          setMessage(res.error?.data?.message || 'Conflict');
          setVisible(true);
        } else if (res.data?.message === 'An Email sent to your account please verify') {
          formikRef.current.resetForm();
          setMessage('An email sent to your account. Please verify and then login');
          setShowTryAgainButton(false);
          setShowLoginButton(true);
          setVisible(true);
        } else {
          setShowTryAgainButton(true);
          setShowLoginButton(true);
          setMessage('Something went wrong');
          setVisible(true);
        }
      })
      .catch(err => {
        console.error('Error resending email:', err);
      });
  };

  const formikRef = useRef();
  const theme =useTheme()

  return (
    <View style={{ flex: 1,backgroundColor:theme.colors.background}}>
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
                    {showTryAgainButton && (
                      <Button onPress={() => { setVisible(false); resendEmail(); }}>
                        Resend Email
                      </Button>
                    )}
                    {showLoginButton && (
                      <Button onPress={() => { setVisible(false); navigation.navigate('Login'); }}>
                        Go to login
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
                placeholder="Enter your email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                mode="outlined"
                style={{ height: 50 }}
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
                style={{ height: 50 }}
                outlineColor={theme.colors.secondary}
              />
              {errors.addressLine1 && touched.addressLine1 && <Text style={{ color: 'red' }}>{errors.addressLine1}</Text>}

              <TextInput
                placeholder="Address line 2"
                onChangeText={handleChange('addressLine2')}
                onBlur={handleBlur('addressLine2')}
                value={values.addressLine2}
                mode="outlined"
                style={{ height: 50, marginTop: '2%' }}
                outlineColor={theme.colors.secondary}
              />

              <TextInput
                placeholder="Address line 3"
                onChangeText={handleChange('addressLine3')}
                onBlur={handleBlur('addressLine3')}
                value={values.addressLine3}
                mode="outlined"
                style={{ height: 50, marginTop: '2%' }}
                outlineColor={theme.colors.secondary}
              />

              <Text style={{ fontWeight: '800', marginVertical: '2%' }}>Post code</Text>
              <TextInput
                placeholder="Enter your post code"
                onChangeText={handleChange('postCode')}
                onBlur={handleBlur('postCode')}
                value={values.postCode}
                mode="outlined"
                style={{ height: 50 }}
                outlineColor={theme.colors.secondary}
              />

              <Text style={{ fontWeight: '800', marginVertical: '2%' }}>City</Text>
              <TextInput
                placeholder="Enter your city"
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
                mode="outlined"
                style={{ height: 50 }}
                outlineColor={theme.colors.secondary}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontWeight: '800', marginVertical: '2%' }}>First name</Text>
                  <TextInput
                    placeholder="Enter your first name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    mode="outlined"
                    style={{ height: 50 }}
                    outlineColor={theme.colors.secondary}
                  />
                </View>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontWeight: '800', marginVertical: '2%' }}>Sur name</Text>
                  <TextInput
                    placeholder="Enter your sur name"
                    onChangeText={handleChange('surName')}
                    onBlur={handleBlur('surName')}
                    value={values.surName}
                    mode="outlined"
                    style={{ height: 50 }}
                    outlineColor={theme.colors.secondary}
                  />
                </View>
              </View>

              <Button
                loading={isLoading || resendLoading}
                disabled={isLoading || resendLoading}
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
