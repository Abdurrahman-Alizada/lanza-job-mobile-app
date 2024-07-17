import { View } from 'react-native';
import React from 'react';
import { Icon, Text, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ProgressStep from './ProgressStep';

export default function ProfileWelcomeIndex() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: '6%' }}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: 40 }}>
        Complete your profile
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 15,
        }}
      >
        name, you’re just a few steps away from becoming a true FreeFlexer. You
        can complete your profile now or do it step by step as you progress.
      </Text>

      <TouchableOpacity style={{marginTop:"5%"}} onPress={() => navigation.navigate("ToDoSteps")}>
        <ProgressStep
          step={2}
          totalSteps={4}
          title="Boost your earning potential"
          description="Show clients why they need you on their team."
        />
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => navigation.navigate("ToDoSteps")}>
        <ProgressStep
          step={3}
          totalSteps={4}
          title="After your first shift"
          description="Complete to continue working after your first shift"
        />
      </TouchableOpacity>

    </View>
  );
}
