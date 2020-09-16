import styled, { DefaultTheme } from 'styled-components/native';

interface IContainer {
  theme: DefaultTheme;
  selected: boolean;
  isErr: boolean;
}

export const Container = styled.View`
  border-width: 1px;
  border-radius: 5px;
  border-color: ${({ theme, selected, isErr }: IContainer) =>
    isErr
      ? theme.colors.err
      : selected
      ? theme.colors.prim
      : theme.colors.placeholder};
  align-items: center;
  flex-direction: row;
  padding: 5px 10px;
  margin-top: 20px;
  margin: 20px 10px 0 10px;
`;
export const TextInputBox = styled.TextInput`
  flex: 1;
  margin-left: 5px;
  font-size: 16px;
  color: ${(p) => p.theme.colors.text1};
`;

export const ErrInfo = styled.Text`
  margin-top: 5px;
  color: ${(p) => p.theme.colors.err};
  font-size: 12px;
  margin-left: 10px;
`;
