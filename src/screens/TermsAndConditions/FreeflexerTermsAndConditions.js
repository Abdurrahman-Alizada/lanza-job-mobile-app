import React, { useEffect, useRef, useState } from 'react';
import { View, Alert, PermissionsAndroid, Platform } from 'react-native';
import CustomNavigationBar from '../../components/Appbars/JobsDetailsAppbar';
import { Text, useTheme, Checkbox, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useGenerateSdkTokenMutation } from '../../redux/reducers/user/userThunk';
import Onfido, { OnfidoCaptureType, OnfidoCountryCode, OnfidoDocumentType } from '@onfido/react-native-sdk';
import { useSelector } from 'react-redux';

export default function FreeflexerTermsAndCondition() {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const initialized = useRef(false);
  const currentLoginUser = useSelector(state => state.user.currentLoginUser);
  const [generateSdkToken, { isLoading }] = useGenerateSdkTokenMutation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs camera permission to verify your identity",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Camera Permission Denied", "Camera permission is required to proceed with the verification.");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const generateSdkTokenHandler = () => {
    console.log("generateSdkTokenHandler call");
    generateSdkToken(currentLoginUser.applicantId).then((res) => {
      if (res.data?.token) {
        onfidoHandler(res.data?.token);
      } else {
        console.log("generateSdkToken error");
        alert("generateSdkToken error");
      }
    });
    // onfidoHandler("eyJhbGciOiJFUzUxMiJ9.eyJleHAiOjE3MTk1MDk2MzcsInBheWxvYWQiOnsiYXBwIjoiMjY2ZTM1YjUtNzEzZS00YjgxLWFiMTItMjkyZWZiNzg5OWNjIiwiY2xpZW50X3V1aWQiOiIyNTQyOTRkZS0yY2JkLTQ4ZWYtYjRlMC01OWJiNWYzZTllYzAiLCJpc19zYW5kYm94Ijp0cnVlLCJpc19zZWxmX3NlcnZpY2VfdHJpYWwiOnRydWUsImlzX3RyaWFsIjp0cnVlLCJzYXJkaW5lX3Nlc3Npb24iOiI4Yjk0M2FlZC0zNzEyLTQ5YmItOWM0ZS03ZjZlNjkyN2I4NjQifSwidXVpZCI6InBsYXRmb3JtX3N0YXRpY19hcGlfdG9rZW5fdXVpZCIsInVybHMiOnsiZGV0ZWN0X2RvY3VtZW50X3VybCI6Imh0dHBzOi8vc2RrLm9uZmlkby5jb20iLCJzeW5jX3VybCI6Imh0dHBzOi8vc3luYy5vbmZpZG8uY29tIiwiaG9zdGVkX3Nka191cmwiOiJodHRwczovL2lkLm9uZmlkby5jb20iLCJhdXRoX3VybCI6Imh0dHBzOi8vYXBpLm9uZmlkby5jb20iLCJvbmZpZG9fYXBpX3VybCI6Imh0dHBzOi8vYXBpLm9uZmlkby5jb20iLCJ0ZWxlcGhvbnlfdXJsIjoiaHR0cHM6Ly9hcGkub25maWRvLmNvbSJ9fQ.MIGIAkIBdQu4YuZdQYHLKCruPv8PeVrBYxi0oJfHIybj2cMG5GwLAyVKrmu2iVYUE1KXlWLKWVgo7yO2YV3xe8v0ngH1i_oCQgHf7gP41iltlGrpPV1CY6PWzR_062HES3XkhAKuihYwZZnvean3na3b-wi2hTby3Oh0HZXk8u1ftaL5MB3_E4XvMg")

  };

  const onfidoHandler = (token) => {
    const config = {
      sdkToken: token,
      flowSteps: {
        welcome: true,
        captureFace: {
          type: OnfidoCaptureType.PHOTO, // Options: 'photo' or 'video'
          // useUploader: false, // Optional: enable/disable manual upload
        },
        captureDocument: {
          docType: OnfidoDocumentType.NATIONAL_IDENTITY_CARD,
          countryCode: OnfidoCountryCode.GBR, // Optional: specify the country for the document
          useUploader: true
        },
        // additional steps if needed
        complete: {
          message: 'Verification complete! Thank you.',
        },
      },
      disableNFC: true,
      options: {
        success: (data) => {
          console.log('Verification successful:', data);
          Alert.alert("Success", "Verification successful");
        },
        error: (error) => {
          console.error('Verification error:', error);
          Alert.alert("Error", `Verification error: ${error.message}`);
        },
      },
    };
    Onfido.start(config)
      .then(res => {
        console.log('OnfidoSDK: Success:', JSON.stringify(res))
        navigation.navigate("Main")
        }
      )
      .catch(err => {
        console.warn('OnfidoSDK: Error:', err.code, err.message);
        Alert.alert("OnfidoSDK Error", `${err.code}: ${err.message}`);
      });
    initialized.current = true;
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <CustomNavigationBar />
      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 15, fontSize: 22 }}>Welcome!</Text>
        <Text style={{
          marginTop: 20,
          fontSize: 15,
          textAlign: 'justify',
          letterSpacing: 0.5,
          lineHeight: 19
        }}>
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </Text>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginTop: 110,
        width: '100%'
      }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color={theme.colors.primary}
        />
        <View style={{ flex: 1 }}>
          <Text style={{
            color: '#696969',
            fontSize: 15,
            marginLeft: 8
          }}>
            I will take these responsibilities and would
          </Text>
          <Text style={{
            color: '#696969',
            fontSize: 15,
            marginLeft: 8
          }}>
            like to become a FreeFlexer
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 35, width: '100%' }}>
        <Button
          mode="contained"
          onPress={generateSdkTokenHandler}
          style={{
            width: '90%',
            borderRadius: 6,
            backgroundColor: theme.colors.primary,
            opacity: checked ? 1 : 0.5
          }}
          contentStyle={{ height: 48 }}
          labelStyle={{ color: 'white', fontSize: 16 }}
          disabled={!checked}
        >
          Let's do this!
        </Button>
        <Button
          mode="text"
          onPress={() => { }}
          labelStyle={{ color: checked ? 'blue' : 'rgba(0, 0, 255, 0.5)', fontSize: 16 }}
          style={{ marginTop: 10 }}
          disabled={!checked}
        >
          I have some questions
        </Button>
      </View>
    </View>
  );
}
