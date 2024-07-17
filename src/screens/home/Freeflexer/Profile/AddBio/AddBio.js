import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  bio: Yup.string()
    .min(10, 'Bio must be at least 10 characters')
    .required('Bio is required')
});

export default function AddBio() {
  const theme = useTheme();
  const navigation = useNavigation();

  const initialValues = {
    bio: '',
  };

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Handle form submission
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '4%', paddingBottom: 100 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 30 }}>
                Complete your profile by adding your bio
              </Text>

              <TextInput
                mode="outlined"
                style={{
                  marginTop: "5%",
                  paddingVertical: "4%",
                  borderWidth: 0.3,
                  borderRadius: 4,
                }}
                placeholderTextColor={theme.colors.placeholder}
                multiline={true}
                numberOfLines={12}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                placeholder='Enter your bio'
              />
              {touched.bio && errors.bio && (
                <Text style={{ color: theme.colors.error, marginTop: 5 }}>
                  {errors.bio}
                </Text>
              )}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleSubmit}
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: 8,
                  marginHorizontal: 14,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: theme.colors.background, fontWeight: 'bold' }}>Save</Text>
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    padding: 8,
  },
});
