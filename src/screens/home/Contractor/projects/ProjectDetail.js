import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, useTheme, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProjectDetail = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { project } = route.params;


  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header>
           <Appbar.BackAction onPress={() => navigation.goBack()} />

           </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, color:theme.colors.primary }}>{project.name}</Text>
    
        <Button
          mode="contained"
          style={{marginTop:"5%",}}
          onPress={() => navigation.navigate('UpdateProject', { project: project })}
          contentStyle={{ padding: 8, backgroundColor: theme.colors.primary }}
        >
          Edit project
        </Button>
      </ScrollView>
    </View>
  );
};

export default ProjectDetail;
