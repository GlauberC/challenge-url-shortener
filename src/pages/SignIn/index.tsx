import React, { useState, useCallback, useRef } from 'react';
import { TextInput, Modal } from 'react-native';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../providers/auth.provider';
import Input from '../../components/Input';
import * as S from './styles';
import formValidation from './formValidation';
import ButtonFill from '../../components/ButtonFill';
import getValidationErros from '../../../android/app/src/utils/getValidationErros';
import ButtonBorder from '../../components/ButtonBorder';

interface IModalData {
  titleButton: string;
  message: string;
  status: 'success' | 'error';
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const { signIn, loading } = useAuth();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState<IModalData>();

  const [errUserName, setErrUserName] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const passwordInputRef = useRef<TextInput>(null);

  const resetErrors = useCallback(() => {
    setErrUserName('');
    setErrPassword('');
  }, []);

  const setErrors = useCallback((errors) => {
    errors.userName && setErrUserName(errors.userName);
    errors.password && setErrPassword(errors.password);
  }, []);

  const handleMessageModal = useCallback((data: IModalData) => {
    setModalData(data);
    setIsShowModal(true);
  }, []);

  const handleOkModal = useCallback(() => {
    if (modalData?.status === 'error') {
      setIsShowModal(false);
    } else {
      navigate('Intro');
    }
  }, [modalData?.status, navigate]);

  const handleSignIn = useCallback(async () => {
    resetErrors();
    try {
      await formValidation({ userName, password });
      await signIn({ userName, password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors(getValidationErros(err));
      } else if (err.response?.data.status === 403) {
        handleMessageModal({
          message:
            'Credenciais inválidas, verifique seu username e digite novamente sua senha',
          titleButton: 'Ok',
          status: 'error',
        });
      } else {
        handleMessageModal({
          message:
            'Houve um erro inesperado, verifique sua conexão com a internet ou tente novamente mais tarde ',
          titleButton: 'Ok',
          status: 'error',
        });
      }
    }
  }, [handleMessageModal, password, resetErrors, setErrors, signIn, userName]);

  return (
    <S.Container>
      <Modal
        visible={isShowModal}
        statusBarTranslucent
        transparent
        animationType="fade"
      >
        <S.ModalShadow>
          <S.ModalContainer>
            <S.ModalText>{modalData?.message}</S.ModalText>

            <ButtonBorder onPress={handleOkModal}>
              {modalData?.titleButton}
            </ButtonBorder>
          </S.ModalContainer>
        </S.ModalShadow>
      </Modal>

      <S.Form>
        <Input
          iconName="account-box"
          placeholder="Digite seu username"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          errMsg={errUserName}
          value={userName}
          onChangeText={setUserName}
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
        />
        <Input
          ref={passwordInputRef}
          iconName="lock"
          placeholder="Digite sua senha"
          secureTextEntry
          returnKeyType="send"
          errMsg={errPassword}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSignIn}
        />
        <S.ButtonGroup>
          <ButtonFill onPress={handleSignIn} loading={loading}>
            Entrar no sistema
          </ButtonFill>
          <ButtonBorder onPress={() => navigate('SignUp')}>
            Não tenho conta!
          </ButtonBorder>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default SignIn;
