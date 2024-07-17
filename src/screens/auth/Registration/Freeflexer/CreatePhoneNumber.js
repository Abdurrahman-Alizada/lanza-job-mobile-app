import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme, Button, TextInput } from 'react-native-paper';
import AuthAbbar from '../../../../components/Appbars/AuthAbbar';
import { useUpdateUserMutation } from '../../../../redux/reducers/user/userThunk';
import { t } from 'i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

// Validation schema
const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be only digits")
        .min(10, "Phone number must be at least 10 digits")
        .required("*required"),
});

export default function CreatePhoneNumber({ navigation }) {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false)

    const currentLoginUser = useSelector(state => state.user.currentLoginUser)
    const [updateUser, { isLoading: updatePasswordLoading, isError, error }] = useUpdateUserMutation();

    const submitHandler = (values, actions) => {
        setIsLoading(true)
        updateUser({
            id: currentLoginUser.id,
            phoneNumber: values.phoneNumber,
        }).then((res) => {
            if (res.error) {
                // setErrorMessage(res.error?.data?.message || 'Registration error');
                // setVisible(true);
            } else if (res.data.message == "Freeflexer updated successfully") {
                actions.resetForm()
                navigation.navigate("Address")
            }
            console.log("first", res)
        })
        setIsLoading(false)
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <AuthAbbar title={'Sign in'} />
            <View style={{ marginLeft: 18, marginTop: 25 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>What is your phone number?</Text>
                <Text style={{ marginTop: 20, color: theme.colors.placeholder }}>
                    Client will only see your mobile number if you have applied to their jobs.
                </Text>
            </View>
            <Formik
                initialValues={{ phoneNumber: '' }}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View style={{ marginHorizontal: 18, marginTop: 25 }}>
                        <Text style={{ fontWeight: '800' }}>Phone Number</Text>
                        <TextInput
                            placeholder={t('Phone Number')}
                            mode="outlined"
                            style={{ marginTop: '2%' }}
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            activeOutlineColor={theme.colors.secondary}
                            keyboardType="phone-pad"
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                            <Text style={{ color: theme.colors.error }}>
                                {errors.phoneNumber}
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
                            buttonColor={theme.colors.blueBG}
                        >
                            {t('Next')}
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}
