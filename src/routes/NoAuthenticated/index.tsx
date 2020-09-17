import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import Intro from '../../pages/Intro';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';

const Stack = createStackNavigator();

const NoAuthenticated: React.FC = () => {
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
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'Cadastre-se agora' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'Faça seu login' }}
      />
    </Stack.Navigator>
  );
};

export default NoAuthenticated;
