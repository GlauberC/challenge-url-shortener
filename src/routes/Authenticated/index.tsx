import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import Home from '../../pages/Home';
import { useAuth } from '../../providers/auth.provider';

const Stack = createStackNavigator();

const Authenticated: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.text1,
        headerStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: `Olá ${user?.user.userName}` }}
      />
    </Stack.Navigator>
  );
};

export default Authenticated;
