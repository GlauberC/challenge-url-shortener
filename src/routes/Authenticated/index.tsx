import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AlertModal from '../../components/AlertModal';
import Home from '../../pages/Home';
import ConfirmShorten from '../../pages/ConfirmShorten';
import { useAuth } from '../../providers/auth.provider';
import * as S from './styles';

const Stack = createStackNavigator();

const Authenticated: React.FC = () => {
  const { signOut } = useAuth();
  const [isShowAlert, setIsShowAlert] = useState(false);
  const { user } = useAuth();
  const { colors } = useTheme();
  return (
    <>
      <AlertModal
        titleButton="sim"
        yesNoOption
        message="Você realmente gostaria de sair da aplicação?"
        close={() => setIsShowAlert(false)}
        toggleState={isShowAlert}
        handlePressed={signOut}
      />
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
          options={{
            title: `Olá ${user?.user.userName}`,
            headerLeft: () => (
              <S.IconButton>
                <Icons
                  name="exit-to-app"
                  size={28}
                  color={colors.prim}
                  onPress={() => setIsShowAlert(true)}
                />
              </S.IconButton>
            ),
          }}
        />
        <Stack.Screen
          name="ConfirmShorten"
          component={ConfirmShorten}
          options={{ title: 'Url encurtado' }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Authenticated;
