import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ContractorDashboardGeneralAppbar from '../../../../components/Appbars/ContractorDashboardGeneralAppbar';
import { useUpdateUserBusinessMutation } from '../../../../redux/reducers/businesses/businessThunk';

const UpdateBusiness = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { business } = route.params;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Business name is required'),
    address: Yup.string().required('Address is required'),
    nameOnInvoice: Yup.string().required('Name on invoice is required'),
    invoiceAddress: Yup.string().required('Invoice address is required'),
  });

  const [updateUserBusiness, { isLoading, error }] = useUpdateUserBusinessMutation();

  const handleUpdateBusiness = (values) => {
    const updatedBusiness = { business: values, id: business._id }
    updateUserBusiness(updatedBusiness).then((res) => {
      navigation.pop(2)
    })
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: "5%" }}>
        <Formik
          initialValues={{
            name: business.name,
            address: business.address,
            nameOnInvoice: business.nameOnInvoice,
            invoiceAddress: business.invoiceAddress,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateBusiness}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                label="Business Name"
                mode="outlined"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
                style={{ marginBottom: 16 }}
              />
              {touched.name && errors.name && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.name}</Text>}

              <TextInput
                label="Address"
                mode="outlined"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                error={touched.address && errors.address}
                style={{ marginBottom: 16 }}
              />
              {touched.address && errors.address && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.address}</Text>}

              <TextInput
                label="Name on Invoice"
                mode="outlined"
                value={values.nameOnInvoice}
                onChangeText={handleChange('nameOnInvoice')}
                onBlur={handleBlur('nameOnInvoice')}
                error={touched.nameOnInvoice && errors.nameOnInvoice}
                style={{ marginBottom: 16 }}
              />
              {touched.nameOnInvoice && errors.nameOnInvoice && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.nameOnInvoice}</Text>}

              <TextInput
                label="Invoice Address"
                mode="outlined"
                value={values.invoiceAddress}
                onChangeText={handleChange('invoiceAddress')}
                onBlur={handleBlur('invoiceAddress')}
                error={touched.invoiceAddress && errors.invoiceAddress}
                style={{ marginBottom: 16 }}
              />
              {touched.invoiceAddress && errors.invoiceAddress && <Text style={{ color: 'red', marginBottom: 8 }}>{errors.invoiceAddress}</Text>}

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
                Update Business
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default UpdateBusiness;
