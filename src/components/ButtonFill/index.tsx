import React, { ReactNode } from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import * as S from './styles';

interface IButton extends RectButtonProperties {
  children: ReactNode;
}

const ButtonFill: React.FC<IButton> = ({ children, ...rest }) => (
  <S.Container {...rest}>
    <S.Label>{children}</S.Label>
  </S.Container>
);

export default ButtonFill;
