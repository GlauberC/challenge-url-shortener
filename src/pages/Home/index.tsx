import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../providers/auth.provider';

const Home: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Component Home</Text>
      <Button title="Sair da aplicação" onPress={signOut} />
    </View>
  );
};

export default Home;
