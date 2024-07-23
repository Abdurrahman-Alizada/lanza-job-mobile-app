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
  useRegisterContractorMutation,
  useRegisterUserMutation,
  useResendEmailForUserRegistrationMutation,
} from '../../../../redux/reducers/user/userThunk';
import AuthAppbar from "../../../../components/Appbars/AuthAbbar"; // Adjust import path as needed

const validationSchema = Yup.object().shape({
  firstName: Yup.string().label('First name'),
  surName: Yup.string().label('Sur name'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('* Email is required')
    .label('Email'),
  password: Yup.string()
    .min(6, ({ min }) => `Password must be at least ${10} characters`)
    .required('*required')
    .label('Password'),

});

const ContractorSignupWithEmail = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const [loading,setLoading] = useState(false)
  const emailRef = useRef('');

  const [registerUser, { isLoading }] = useRegisterContractorMutation();
  const [resendEmailForUserRegistration, { isLoading: resendLoading }] = useResendEmailForUserRegistrationMutation();
  const submitHandler = async (values, formikBag) => {
    emailRef.current = values.email;
    setLoading(true)
    try {
      const res = await registerUser({
        email: values.email,
        firstName: values.firstName,
        surName: values.surName,
        password:values.password
      });
      if (res.data?.message === 'Email has been sent for verification') {
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
      setLoading(false)
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
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AuthAppbar title="Sign up as contractor." />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: '5%' }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="dark-content" />

        <Formik
          innerRef={formikRef}
          initialValues={{
            companyName: '',
            firstName: '',
            surName: '',
            email: '',
            password: ''
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
                Sign up as a client
              </Text>

              {/* <Text style={{ fontWeight: '800', marginBottom: '2%' }}>Company name/Registration no </Text>
              <TextInput
                placeholder="Enter your email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.companyName}
                mode="outlined"
                style={{ height: 50 }}
                outlineColor={theme.colors.secondary}
              />
              {errors.companyName && touched.companyName && <Text style={{ color: 'red' }}>{errors.companyName}</Text>} */}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: "3%" }}>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontWeight: '800', marginBottom: '2%' }}>First name</Text>
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
                  <Text style={{ fontWeight: '800', marginBottom: '2%' }}>Sur name</Text>
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

              <Text style={{ fontWeight: '800', marginTop: "3%", marginBottom: '2%' }}>Email</Text>
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

              <Text style={{ fontWeight: '800', marginTop: '3%', marginBottom: "2%" }}>Password</Text>

              <TextInput
                placeholder={'Password'}
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                mode="outlined"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                activeOutlineColor={theme.colors.secondary}
              />
              {errors.password && touched.password ? (
                <Text style={{ color: theme.colors.error }}>
                  {errors.password}
                </Text>
              ) : null}

              <Button
                loading={isLoading || resendLoading || loading}
                disabled={isLoading || resendLoading || loading}
                style={{ marginTop: '8%' }}
                contentStyle={{ padding: '2%' }}
                theme={{ roundness: 1 }}
                mode="contained"
                onPress={handleSubmit}

                // onPress={() =>
                //   navigation.navigate('Main', {
                //     screen: 'ContractorStack',
                //     params: {
                //       screen: 'ContractorTermsAndConditions',
                //     },
                //   })
                // }
              >
                Sign up
              </Button>
            </View>
          )}
        </Formik>

        <View style={{ marginVertical: '5%', alignItems: 'center' }}>
          <Button
            mode="text"
            disabled={isLoading}
            onPress={() => navigation.navigate("Login")}
            labelStyle={{ color: '#3F51B5', fontWeight: 'bold' }}
          >
            I already have an account
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContractorSignupWithEmail;
