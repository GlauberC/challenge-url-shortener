import React, { ReactNode } from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './styles';

interface IButton extends RectButtonProperties {
  children: ReactNode;
  loading?: boolean;
}

const ButtonFill: React.FC<IButton> = ({ children, loading, ...rest }) => {
  const { colors } = useTheme();
  return (
    <S.Container {...rest}>
      {loading ? (
        <ActivityIndicator color={colors.text1} />
      ) : (
        <S.Label>{children}</S.Label>
      )}
    </S.Container>
  );
};

export default ButtonFill;
