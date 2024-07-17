import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme, Button, Text, TextInput, IconButton, Icon } from 'react-native-paper';
import AuthAbbar from '../../../../components/Appbars/AuthAbbar';
import { useLoginUserMutation } from '../../../../redux/reducers/user/userThunk';

export default function Address({ navigation }) { 
    const theme = useTheme();
    const [{ isLoading }] = useLoginUserMutation();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <AuthAbbar title={'Sign in'} />
            <View style={{ marginTop: 25, padding: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>What is your home address?</Text>
                <Text style={{ marginTop: 20, color: theme.colors.placeholder }}>
                    We need it to create invoices and to show the
                </Text>
                <Text style={{ color: theme.colors.placeholder }}>
                    best jobs in your area.
                </Text>

               <TouchableOpacity
                onPress={() => { navigation.navigate("SearchAddress") }}
                 style={{
                     marginTop:50,
                     paddingHorizontal: "5%",
                     paddingVertical:"3%",
                     borderRadius:6, 
                     marginVertical: "2%", 
                     flexDirection: "row", 
                     alignItems: "center", 
                     justifyContent: "space-between",
                     borderColor: theme.colors.placeholder,
                     borderWidth: 1 
                     }}>
                        
                    <Text> Home address </Text>
                    <Icon source="chevron-right" size={30} />
                </TouchableOpacity>

                <Button
                onPress={() => { navigation.navigate("FreeflexerTermsAndCondition") }}
                    loading={isLoading}
                    disabled={isLoading}
                    style={{
                        marginVertical: '5%',
                    }}
                    contentStyle={{ padding: '3%' }}
                    theme={{ roundness: 1 }}
                    mode="contained"
                    buttonColor={theme.colors.blueBG}
                >
                    <Text style={{
                        color: theme.colors.background
                    }}>Let's do this!</Text>
                </Button>
            </View>
        </View>
    );
}
