import React from 'react';
import ButtonFill from '../../components/ButtonFill';
import ButtonBorder from '../../components/ButtonBorder';
import * as S from './styles';

const Intro: React.FC = () => (
  <S.Container>
    <S.Logo>
      <S.Title>Encurta</S.Title>
      <S.Title>URL</S.Title>
      <S.IntroMessage>
        A maneira mais elegante de compartilhar URLs
      </S.IntroMessage>
    </S.Logo>
    <S.ButtonGroup>
      <ButtonFill>Entrar</ButtonFill>
      <ButtonBorder>Cadastrar</ButtonBorder>
    </S.ButtonGroup>
  </S.Container>
);

export default Intro;
