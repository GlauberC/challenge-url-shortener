import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import * as S from './styles';
import Input from '../../components/Input';
import ButtonFill from '../../components/ButtonFill';
import { temp } from './temp';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [errUrl, setErrUrl] = useState('');

  return (
    <S.Container>
      <Input
        iconName="link"
        errMsg={errUrl}
        value={url}
        placeholder="Digite o URL"
        onChangeText={setUrl}
      />
      <S.Sep />
      <ButtonFill>Encurtar URL</ButtonFill>
      <FlatList
        data={temp}
        keyExtractor={(urlList) => String(urlList.id)}
        ListHeaderComponent={() => (
          <>
            <S.Message>Ultimos urls encurtados</S.Message>
          </>
        )}
        renderItem={({ item }) => (
          <S.UrlContainer>
            <S.UrlDate>{item.data}</S.UrlDate>
            <S.LabeledView>
              <S.Label>Original: </S.Label>
              <S.UrlOriginal>{item.original}</S.UrlOriginal>
            </S.LabeledView>
            <S.LabeledView>
              <S.Label>Curta: </S.Label>
              <S.UrlShort>{item.curta}</S.UrlShort>
            </S.LabeledView>
          </S.UrlContainer>
        )}
      />
    </S.Container>
  );
};

export default Home;
