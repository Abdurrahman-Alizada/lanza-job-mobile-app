import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, Text, Button, Dialog, Paragraph, Portal, useTheme } from 'react-native-paper';
import { useAddPasswordMutation, useLoginUserMutation } from '../../../../redux/reducers/user/userThunk';
import AuthAppbar from '../../../../components/Appbars/AuthAbbar';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, ({ min }) => `Password must be at least ${10} characters`)
        .required('*required')
        .label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('*required')
        .label('Confirm Password'),
});

const LoginScreen = ({ navigation, route }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const currentLoginUser = useSelector(state => state.user.currentLoginUser)

    const [errorMessage, setErrorMessage] = useState('Something went wrong');

    const [addPassword, { isLoading: addPasswordLoading, isError, error }] = useAddPasswordMutation();
    const submitHandler = async (values, actions) => {
        setIsLoading(true)
        addPassword({
            id: currentLoginUser.id,
            password: values.password,
        }).then((res) => {
            if (res.error) {
                setErrorMessage(res.error?.data?.message || 'Registration error');
                setVisible(true);
            } else if (res.data.message == "Password updated successfully") {
                actions.resetForm()
                navigation.navigate("CreatePhoneNumber")
            }
        })
        setIsLoading(false)
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <AuthAppbar title={'Sign in'} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex: 1,
                    paddingVertical: '2%',
                }}>
                <View style={{ marginLeft: 21, marginTop: 25 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Create password</Text>

                    <Text style={{ marginTop: 20, color: theme.colors.placeholder }}> Create a password for your account. It should</Text>

                    <Text style={{ color: theme.colors.placeholder }}>  have at least 10 characters.</Text>
                </View>
                <Portal>
                    <Dialog visible={visible} onDismiss={() => setVisible(true)}>
                        <Dialog.Title>Sign in</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                {' '}
                                {errorMessage} {isError && error?.error}
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setVisible(false)}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: '',
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
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                marginTop: '10%',
                                paddingHorizontal: '5%',
                            }}>
                            <View>
                                <Text style={{ fontWeight: "800" }}>Password</Text>
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

                                <Text style={{ fontWeight: "800", marginTop: "2%" }}>Confirm Password</Text>

                                <TextInput
                                    placeholder={t('Confirm Password')}
                                    secureTextEntry={!showPassword}
                                    right={
                                        <TextInput.Icon
                                            icon={showPassword ? 'eye' : 'eye-off'}
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    }
                                    mode="outlined"
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    activeOutlineColor={theme.colors.secondary}
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <Text style={{ color: theme.colors.error }}>
                                        {errors.confirmPassword}
                                    </Text>
                                ) : null}

                                <Button
                                    loading={isLoading}
                                    disabled={isLoading}
                                    style={{
                                        marginVertical: '5%',

                                    }}
                                    contentStyle={{ padding: '3%' }}
                                    theme={{ roundness: 1 }}
                                    mode="contained"
                                    onPress={handleSubmit}
                                    buttonColor={theme.colors.blueBG}>
                                    {t('Next')}
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    img: {
        width: 100,
        alignSelf: 'center',
        height: 100,
        borderRadius: 400,
    },
    buttonStyle: {
        height: 60,
        justifyContent: 'flex-start',
        paddingHorizontal: 50,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginVertical: '2%',
        backgroundColor: '#EDEEF0',
    },
    buttonTextStyle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
    },
});
