import React from 'react';
import { View, Text } from 'react-native';
import { Icon, ProgressBar, useTheme } from 'react-native-paper';

const ProgressStep = ({ step, totalSteps, title, description }) => {
    const { colors } = useTheme();
    const progress = step / totalSteps;
    const theme = useTheme()
    return (
        <View style={{
            marginTop: "5%",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.lightgrey,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    width: 45,
                    height: 45,
                    borderRadius: 40,
                    borderWidth: 2,
                    borderColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{step}/{totalSteps}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
                    <Text style={{ fontSize: 14, marginTop:"2%" }}>{description}</Text>
                </View>
                <Icon source="chevron-right" size={30} color={theme.colors.onBackground} />

            </View>
            <ProgressBar progress={progress} color={colors.primary} style={{ height: 5, marginTop: 10, borderRadius: 2.5 }} />
        </View>
    );
};

export default ProgressStep;
