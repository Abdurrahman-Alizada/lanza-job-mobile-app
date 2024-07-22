import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUpdateProjectMutation } from '../../../../redux/reducers/projects/projectThunk';

const UpdateProject = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { project } = route.params;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Project name is required'),
  });

  const [updateProject, { isLoading, error }] = useUpdateProjectMutation();

  const handleUpdateProject = (values) => {
    const updatedProject = { project: values, id: project._id }
    updateProject(updatedProject).then((res) => {
      navigation.pop(2)
    })
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: "5%" }}>
        <Formik
          initialValues={{
            name: project.name,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProject}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                label="Project Name"
                mode="outlined"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
                style={{ marginBottom: 16 }}
              />
              {touched.name && errors.name && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.name}</Text>}

              <Button
                mode="contained"
                disabled={isLoading}
                loading={isLoading}
                onPress={handleSubmit}
                contentStyle={{
                  padding: 10,
                  borderRadius: 5,
                  alignSelf: 'center',
                  width: '100%',
                }}
                labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Update project
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default UpdateProject;
