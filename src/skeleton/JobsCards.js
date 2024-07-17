import { View, } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed'
import { Divider, useTheme } from 'react-native-paper'

const JobsCardsSkeleton = ({ len }) => {
    const theme = useTheme()

    return (
        <View style={{}}>
            {len.map((item, index) => (

                <View key={index} style={{ paddingVertical: "3%", paddingHorizontal:"5%" }}>
                    <View style={{ padding: "3%", backgroundColor: theme.colors.background, borderRadius: 5 }}>
                        <Skeleton style={{ height: 15, width: "40%", marginBottom: 15 }} />
                        <View style={{ flexDirection: "row" }}>
                            <Skeleton circle width={40} style={{ marginRight: "2%" }} height={40} />
                            <View >
                                <Skeleton width={120} height={20} style={{ marginBottom: 5 }} />
                                <Skeleton width={120} height={15} />
                            </View>

                        </View>
                        <Divider style={{ marginVertical: "4%" }} />
                        <Skeleton style={{ height: 25, width: "60%", marginBottom: 15 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Skeleton style={{ height: 15, width: "40%", marginBottom: 15 }} />
                            <Skeleton style={{ height: 35, width: "40%", marginBottom: 15 }} />

                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default JobsCardsSkeleton