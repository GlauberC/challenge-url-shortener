import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as S from './styles';

interface IButton extends TouchableOpacityProps {
  children: ReactNode;
}

const ButtonBorder: React.FC<IButton> = ({ children, ...rest }) => (
  <S.Container {...rest} activeOpacity={0.5}>
    <S.Label>{children}</S.Label>
  </S.Container>
);

export default ButtonBorder;
