import React, { useState } from 'react';
import { Text, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import { useAuth } from '../../providers/auth.provider';
import AlertModal from '../../components/AlertModal';

const Home: React.FC = () => {
  // const { navigate } = useNavigation();

  const [isShowAlert, setIsShowAlert] = useState(false);
  return (
    <S.Container>
      <Text>Component Home</Text>
      <Button title="Sair da aplicação" onPress={() => setIsShowAlert(true)} />
    </S.Container>
  );
};

export default Home;
