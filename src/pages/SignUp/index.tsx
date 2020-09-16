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

const SignUp: React.FC = () => {
  const { navigate } = useNavigation();
  const { signUp, loading } = useAuth();

  const [name, setName] = useState('User Teste');
  const [userName, setUserName] = useState('userteste');
  const [email, setEmail] = useState('userteste@gmail.com');
  const [password, setPassword] = useState('user123');
  const [rPassword, setRPassword] = useState('user123');

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

  const handleSignUp = useCallback(async () => {
    resetErrors();
    const signUpData = { name, email, password, userName };
    try {
      await formValidation({ ...signUpData, rPassword });
      await signUp(signUpData);
      handleMessageModal({
        message:
          'Usuário cadastrado com sucesso, você já pode entrar usando suas credenciais',
        titleButton: 'Voltar para tela inicial',
        status: 'success',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors(getValidationErros(err));
      } else if (err.response?.data.error === 'Bad Request') {
        err.response.data.validation.login &&
          setErrUserName('Esse username já está em uso');
        err.response.data.validation.email &&
          setErrEmail('Esse email já está em uso');
      } else {
        handleMessageModal({
          message:
            'Houve um erro inesperado, verifique sua conexão com internet ou tente novamente mais tarde ',
          titleButton: 'Ok',
          status: 'error',
        });
      }
    }
  }, [
    email,
    handleMessageModal,
    name,
    password,
    rPassword,
    resetErrors,
    setErrors,
    signUp,
    userName,
  ]);

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
          placeholder="Digite sua novamente senha"
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
            Já tenho conta
          </ButtonBorder>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default SignUp;
