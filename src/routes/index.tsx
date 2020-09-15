import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import Intro from '../pages/Intro';
import SignUp from '../pages/SignUp';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
