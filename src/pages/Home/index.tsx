import React, { useState, useCallback, useRef, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList, TextInput, ActivityIndicator, Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { format } from 'date-fns';
import * as Yup from 'yup';

import { useTheme } from 'styled-components/native';
import { useAuth } from '../../providers/auth.provider';

import { getCutUrl } from '../../services/apiShorten';

import * as S from './styles';
import Input from '../../components/Input';
import api from '../../services/api';
import MiniButtonFill from '../../components/MiniButtonFill';
import MiniButtonBorder from '../../components/MiniButtonBorder';
import getValidationErros from '../../../android/app/src/utils/getValidationErros';
import formValidation from './formValidation';
import AlertModal from '../../components/AlertModal';

interface IModalData {
  titleButton: string;
  message: string;
}

interface IRequestUrl {
  id: number;
  data: string;
  curta: string;
  original: string;
}
interface IUrl {
  id: string;
  date: string;
  shortUrl: string;
  original: string;
}

const Home: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const [url, setUrl] = useState('http://google.com');
  const [errUrl, setErrUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingShorten, setLoadingShorten] = useState(false);

  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState<IModalData>();

  const [urls, setUrls] = useState<IUrl[]>([]);

  const urlInputRef = useRef<TextInput>(null);

  const openLink = useCallback(async (urlLink) => {
    await Linking.openURL(urlLink);
  }, []);

  const loadUrls = useCallback(async () => {
    try {
      if (user) {
        setLoading(true);
        const { id } = user.user;
        const response = await api.get(`/url/listar/${id}`);
        const urlsResponse: IRequestUrl[] = response.data;
        const formatedUrls = urlsResponse
          .map((u) => {
            return {
              date: format(Date.parse(u.data), 'dd/MM/yyyy - hh:mm'),
              shortUrl: u.curta,
              original: u.original,
              id: String(u.id),
            };
          })
          .reverse();
        setLoading(false);
        setUrls(formatedUrls);
      }
    } catch (err) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  const handleShortenUrl = useCallback(async () => {
    setErrUrl('');
    setLoadingShorten(true);
    try {
      await formValidation({ url });
      const response = await getCutUrl(url);
      if (response.data?.url.status === 7 && user) {
        const newUrl = {
          data: new Date(),
          curta: response.data?.url.shortLink,
          original: url,
          idUsuario: user.user.id,
        };
        const responseCreateUrl = await api.post('url', newUrl);
        const addData = {
          date: format(
            Date.parse(responseCreateUrl.data.data),
            'dd/MM/yyyy - hh:mm',
          ),
          original: responseCreateUrl.data.original,
          shortUrl: responseCreateUrl.data.curta,
          id: String(responseCreateUrl.data.id),
        };
        urls.length > 0 ? setUrls([addData, ...urls]) : setUrls([addData]);
        setLoadingShorten(false);
        navigate('ConfirmShorten', {
          request: JSON.stringify(addData),
        });
      }
    } catch (err) {
      setLoadingShorten(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        errors.url && setErrUrl(errors.url);
      } else {
        setModalData({
          message:
            'Houve um erro inesperado, verifique sua conexão com a internet ou tente novamente mais tarde',
          titleButton: 'OK',
        });
        setIsShowModal(true);
      }
    }
  }, [navigate, url, urls, user]);

  const getFromClipboard = useCallback(async () => {
    const content = await Clipboard.getString();
    content && setUrl(content);
    urlInputRef.current?.focus();
  }, []);

  return (
    <S.Container>
      {modalData && (
        <AlertModal
          message={modalData.message}
          titleButton={modalData.titleButton}
          toggleState={isShowModal}
          close={() => setIsShowModal(false)}
          handlePressed={() => setIsShowModal(false)}
        />
      )}
      <Input
        ref={urlInputRef}
        iconName="link"
        errMsg={errUrl}
        autoCapitalize="none"
        autoCorrect={false}
        value={url}
        placeholder="Digite o URL"
        onChangeText={setUrl}
        returnKeyType="send"
        onSubmitEditing={handleShortenUrl}
      />
      <S.Sep />
      <S.ButtonGroup>
        <MiniButtonBorder onPress={getFromClipboard}>
          Colar URL
        </MiniButtonBorder>
        <MiniButtonFill onPress={handleShortenUrl} loading={loadingShorten}>
          Encurtar URL
        </MiniButtonFill>
      </S.ButtonGroup>
      {loading ? (
        <ActivityIndicator color={colors.prim} size="large" />
      ) : (
        <FlatList
          data={urls}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <>
              <S.Message>Ultimos urls encurtados</S.Message>
            </>
          )}
          renderItem={({ item }) => (
            <S.UrlContainer>
              <S.UrlDate>{item.date}</S.UrlDate>
              <S.LabeledView>
                <S.Label>Original: </S.Label>
                <S.UrlOriginal>{item.original}</S.UrlOriginal>
              </S.LabeledView>
              <S.LabeledView>
                <S.Label>Url curto: </S.Label>
                <S.UrlShortButton
                  onPress={() => openLink(item.shortUrl)}
                  activeOpacity={0.5}
                >
                  <S.UrlShort>{item.shortUrl}</S.UrlShort>
                </S.UrlShortButton>
              </S.LabeledView>
            </S.UrlContainer>
          )}
        />
      )}
    </S.Container>
  );
};

export default Home;
