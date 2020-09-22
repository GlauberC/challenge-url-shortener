import React, { useState, useCallback, useRef } from 'react';
import { TextInput, Keyboard } from 'react-native';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../providers/auth.provider';
import Input from '../../components/Input';
import * as S from './styles';
import formValidation from './formValidation';
import ButtonFill from '../../components/ButtonFill';
import getValidationErros from '../../../android/app/src/utils/getValidationErros';
import ButtonBorder from '../../components/ButtonBorder';
import AlertModal from '../../components/AlertModal';

interface IModalData {
  titleButton: string;
  message: string;
  handlePressed(): void;
}

const SignUp: React.FC = () => {
  const { navigate } = useNavigation();
  const { signUp, loading } = useAuth();

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');

  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState<IModalData>();

  const [errName, setErrName] = useState('');
  const [errUserName, setErrUserName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errRPassword, setErrRPassword] = useState('');

  const userNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const rPasswordInputRef = useRef<TextInput>(null);

  const resetErrors = useCallback(() => {
    setErrName('');
    setErrUserName('');
    setErrEmail('');
    setErrPassword('');
    setErrRPassword('');
  }, []);

  const setErrors = useCallback((errors) => {
    errors.name && setErrName(errors.name);
    errors.email && setErrEmail(errors.email);
    errors.userName && setErrUserName(errors.userName);
    errors.password && setErrPassword(errors.password);
    errors.rPassword && setErrRPassword(errors.rPassword);
  }, []);

  const handleSignUp = useCallback(async () => {
    Keyboard.dismiss();
    resetErrors();
    const signUpData = { name, email, password, userName };
    try {
      await formValidation({ ...signUpData, rPassword });
      await signUp(signUpData);
      setModalData({
        message:
          'Usuário criado com succeso. Você já pode logar no sistema usando seu username e senha',
        titleButton: 'Ir para a página de login',
        handlePressed: () => navigate('SignIn'),
      });
      setIsShowModal(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors(getValidationErros(err));
      } else if (err.response?.data.error === 'Bad Request') {
        err.response.data.validation.login &&
          setErrUserName('Esse username já está em uso');
        err.response.data.validation.email &&
          setErrEmail('Esse email já está em uso');
      } else {
        setModalData({
          message:
            'Houve um erro inesperado, verifique sua conexão com a internet ou tente novamente mais tarde',
          titleButton: 'OK',
          handlePressed: () => setIsShowModal(false),
        });
        setIsShowModal(true);
      }
    }
  }, [
    email,
    name,
    navigate,
    password,
    rPassword,
    resetErrors,
    setErrors,
    signUp,
    userName,
  ]);

  return (
    <S.Container>
      {modalData?.titleButton && (
        <AlertModal
          message={modalData.message}
          titleButton={modalData.titleButton}
          toggleState={isShowModal}
          close={() => setIsShowModal(false)}
          handlePressed={modalData.handlePressed}
        />
      )}

      <S.Form>
        <Input
          iconName="person"
          placeholder="Digite seu nome"
          returnKeyType="next"
          autoCorrect={false}
          value={name}
          errMsg={errName}
          onChangeText={setName}
          onSubmitEditing={() => {
            emailInputRef.current?.focus();
          }}
        />
        <Input
          iconName="mail"
          ref={emailInputRef}
          placeholder="Digite seu email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          errMsg={errEmail}
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => {
            userNameInputRef.current?.focus();
          }}
        />
        <Input
          iconName="account-box"
          ref={userNameInputRef}
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
          returnKeyType="next"
          errMsg={errPassword}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={() => {
            rPasswordInputRef.current?.focus();
          }}
        />
        <Input
          ref={rPasswordInputRef}
          placeholder="Digite novamente sua senha"
          iconName="enhanced-encryption"
          secureTextEntry
          returnKeyType="send"
          errMsg={errRPassword}
          value={rPassword}
          onChangeText={setRPassword}
          onSubmitEditing={handleSignUp}
        />
        <S.ButtonGroup>
          <ButtonFill onPress={handleSignUp} loading={loading}>
            Faça seu cadastro
          </ButtonFill>
          <ButtonBorder onPress={() => navigate('SignIn')}>
            Já tenho conta!
          </ButtonBorder>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default SignUp;
