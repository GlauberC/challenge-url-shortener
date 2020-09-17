import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../providers/auth.provider';
import NoAuthenticated from './NoAuthenticated';
import Authenticated from './Authenticated';

const Routes: React.FC = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <Authenticated /> : <NoAuthenticated />}
    </NavigationContainer>
  );
};

export default Routes;
