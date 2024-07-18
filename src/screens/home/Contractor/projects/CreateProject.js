import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet } from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useGetAllUserBusinessesQuery } from '../../../../redux/reducers/businesses/businessThunk';
import { useCreateProjectMutation } from '../../../../redux/reducers/projects/projectThunk';

const CreateProject = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const currentLoginUser = useSelector(state => state.user.currentLoginUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { data, isLoading } = useGetAllUserBusinessesQuery(currentLoginUser.id);
  const [createProject, { isLoading: createProjectLoading }] = useCreateProjectMutation();
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required('Project name is required'),
  });

  const handleCreateProject = async (values) => {
    if (selectedBusiness) {
      await createProject({
        name: values.projectName,
        business: selectedBusiness._id,
        contractorId:currentLoginUser.id
      });
      navigation.goBack();
    } else {
      alert('Please select a business.');
    }
  };

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedBusiness(item);
        setModalVisible(false);
      }}
      style={styles.businessItem}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    }}>
      <Formik
        initialValues={{ projectName: '' }}
        validationSchema={validationSchema}
        onSubmit={handleCreateProject}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.inputContainer}>
              <Text style={styles.label}>Business</Text>
              <Text style={styles.input}>{selectedBusiness ? selectedBusiness.name : 'Select Business'}</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name of project</Text>
              <TextInput
                placeholder="Enter Project Name"
                onChangeText={handleChange('projectName')}
                onBlur={handleBlur('projectName')}
                value={values.projectName}
                style={styles.input}
              />
              {touched.projectName && errors.projectName && (
                <Text style={styles.errorText}>{errors.projectName}</Text>
              )}
            </View>

            <Button mode="contained" loading={createProjectLoading} disabled={createProjectLoading} onPress={handleSubmit} style={{}}>
              Save
            </Button>
          </View>
        )}
      </Formik>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{
          flex: 1,
          padding: 20,
          backgroundColor: theme.colors.background,

        }}>

          <IconButton
            onPress={() => setModalVisible(false)}
            icon="close"
            iconColor={theme.colors.onBackground}
            size={25}
            style={{ alignSelf: "flex-end" }}
          />
          <FlatList
            data={data?.businesses}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyComponent}>
                <Text>{isLoading ? 'Loading...' : 'No businesses found'}</Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  businessItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emptyComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateProject;
