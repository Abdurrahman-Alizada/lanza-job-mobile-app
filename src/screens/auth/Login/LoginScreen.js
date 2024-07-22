import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  TextInput,
  Text,
  Button,
  Dialog,
  Avatar,
  Paragraph,
  Banner,
  Portal,
  useTheme,
} from 'react-native-paper';
import { useLoginUserMutation } from '../../../redux/reducers/user/userThunk';
import { handleCurrentLoaginUser, handleRole } from '../../../redux/reducers/user/userReducer';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Type your valid email address')
    .required('*required')
    .label('Email'),
  password: Yup.string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('*required')
    .label('Password'),
});

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordResetSuccessflly = useSelector(
    state => state?.user?.passwordResetSuccessflly,
  );

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const submitHandler = async (values, actions) => {
    setLoading(true)
    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });
      if (response.data?.success) {
        if (response?.data?.user) {
          dispatch(handleRole(response.data?.user?.role));
          dispatch(handleCurrentLoaginUser(response.data?.user));
          await AsyncStorage.setItem('role', response.data?.user.role);
          await AsyncStorage.setItem('token', response.data?.user.token);
          await AsyncStorage.setItem('userId', response.data?.user.id);
          await AsyncStorage.setItem('email', response.data?.user.email);
          await AsyncStorage.setItem('isLoggedIn', 'login');
          actions.resetForm();

          let screenTo = null;

          if (response.data?.user?.role === "freeflexer") {
            screenTo = { name: "Main", params: { screen: "FreeflexerStack", params: { screen: "FreeflexerHomeScreen" } } };
          } else if (response.data?.user?.role === "contractor") {
            screenTo = { name: "Main", params: { screen: "ContractorStack", params: { screen: "ContractorHomeScreen" } } };
          }
          navigation.replace(screenTo.name, screenTo.params);

          // navigation.navigate( response.data?.user?.role === "freeflexer" ? "FreeflexerHomeScreen" : "ContractorHomeScreen");
        }
      } else {
        setErrorMessage(response?.error?.data?.message);
        setVisible(true);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      setVisible(true);
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AuthAppbar title={'Sign in'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingVertical: '2%',
        }}>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Sign in</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {errorMessage} {isError && error?.error}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Banner
          visible={passwordResetSuccessflly}
          actions={[
            {
              label: 'Ok',
            },
          ]}
          icon={({ size }) => <Avatar.Icon size={size} icon="check-bold" />}>
          Your password has been reset successfully. You can sign in now with
          the updated password.
        </Banner>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                marginTop: '10%',
                paddingHorizontal: '5%',
              }}>
              <View>
                <TextInput
                  placeholder={t('Email')}
                  mode="outlined"
                  style={{ marginTop: '2%' }}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  activeOutlineColor={theme.colors.secondary}
                />
                {errors.email && touched.email ? (
                  <Text style={{ color: theme.colors.error }}>
                    {errors.email}
                  </Text>
                ) : null}
                <TextInput
                  placeholder={t('Password')}
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye' : 'eye-off'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  mode="outlined"
                  style={{ marginTop: '2%' }}
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
                  loading={isLoading || loading}
                  disabled={isLoading || loading}
                  style={{
                    marginVertical: '5%',
                  }}
                  contentStyle={{ padding: '3%' }}
                  theme={{ roundness: 1 }}
                  mode="contained"
                  onPress={handleSubmit}
                  buttonColor={theme.colors.blueBG}>
                  {t('Log in')}
                </Button>

                <View style={{ marginVertical: '5%', alignItems: 'center' }}>
                  <Button
                    mode="text"
                    onPress={() => navigation.navigate("WelcomeScreen")}
                    labelStyle={{ color: '#3F51B5', fontWeight: 'bold' }}
                  >
                    New to Lanza job? Sign up
                  </Button>
                </View>

                <TouchableOpacity
                  style={{ alignSelf: 'center' }}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text
                    style={{ fontWeight: 'bold', color: theme.colors.error }}>
                    {t('Forgot password')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
