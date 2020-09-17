import React, { useEffect, useState, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Linking } from 'react-native';
import * as S from './style';
import ButtonBorder from '../../components/ButtonBorder';

type RootStackParamList = {
  ConfirmShorten: { request: string };
  Home: undefined;
};
interface IUrl {
  id: string;
  date: string;
  shortUrl: string;
  original: string;
}

type NavigationProps = StackScreenProps<RootStackParamList, 'ConfirmShorten'>;

const ConfirmShorten: React.FC<NavigationProps> = ({ route, navigation }) => {
  const [url, setUrl] = useState<IUrl>();
  useEffect(() => {
    setUrl(JSON.parse(route.params.request));
  }, [route]);

  const openLink = useCallback(async (urlLink) => {
    await Linking.openURL(urlLink);
  }, []);

  return (
    <S.Container>
      {url && (
        <>
          {console.log(url)}
          <S.Message>Url encurtado com succeso</S.Message>
          <S.ShortUrlButton
            activeOpacity={0.5}
            onPress={() => openLink(url.shortUrl)}
          >
            <S.ShortUrl>{url.shortUrl}</S.ShortUrl>
          </S.ShortUrlButton>
          <S.LabeledFields>
            <S.Label>Data: </S.Label>
            <S.Date>{url.date}</S.Date>
          </S.LabeledFields>
          <S.LabeledFields>
            <S.Label>Original: </S.Label>
            <S.Original>{url.original}</S.Original>
          </S.LabeledFields>
          <S.Sep />
          <ButtonBorder onPress={() => navigation.navigate('Home')}>
            Encurtar outro URL
          </ButtonBorder>
        </>
      )}
    </S.Container>
  );
};

export default ConfirmShorten;
