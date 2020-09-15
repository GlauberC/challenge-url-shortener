import React from 'react';
import { View, Text } from 'react-native';
import Providers from './providers';

const App: React.FC = () => {
  return (
    <Providers>
      <View>
        <Text>Component App</Text>
      </View>
    </Providers>
  );
};

export default App;
