import React, { useState, useCallback, useRef } from 'react';
import { TextInput } from 'react-native';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import AlertModal from '../../components/AlertModal';
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
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const { signIn, loading } = useAuth();

  const [userName, setUserName] = useState('userteste');
  const [password, setPassword] = useState('user123');

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

  const handleSignIn = useCallback(async () => {
    resetErrors();
    try {
      await formValidation({ userName, password });
      await signIn({ userName, password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors(getValidationErros(err));
      } else if (err.response?.data.status === 403) {
        setModalData({
          message:
            'Credenciais incorretas. Verifique seu username e digite novamente sua senha',
          titleButton: 'OK',
        });
        setIsShowModal(true);
      } else {
        setModalData({
          message:
            'Houve um erro inesperado, verifique sua conexão com a internet ou tente novamente mais tarde',
          titleButton: 'OK',
        });
        setIsShowModal(true);
      }
    }
  }, [password, resetErrors, setErrors, signIn, userName]);

  return (
    <S.Container>
      {modalData?.titleButton && (
        <AlertModal
          message={modalData.message}
          titleButton={modalData.titleButton}
          toggleState={isShowModal}
          close={() => setIsShowModal(false)}
          handlePressed={() => setIsShowModal(false)}
        />
      )}
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
