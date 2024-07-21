import React, { useContext } from 'react';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';
import { useNavigation, } from '@react-navigation/native';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../themeContext';

const ContractorDashboardGeneralAppbar = ({ greetingText = "Home" }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { isThemeDark } = useContext(ThemeContext);

    return (
        <Appbar.Header
            style={{ paddingRight: "2%", justifyContent: "space-between", backgroundColor: theme.colors.background }}
        >
            <StatusBar
                barStyle={isThemeDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.colors.background}
            />
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <Appbar.BackAction
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ fontSize: 16, fontWeight: "800" }}>{greetingText}</Text>
            </View>
        </Appbar.Header>
    );
};

export default ContractorDashboardGeneralAppbar;
