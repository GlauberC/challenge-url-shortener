import styled from 'styled-components/native';

export const ModalShadow = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;
export const ModalContainer = styled.View`
  margin: 20px;
  padding: 20px;
  background: ${(p) => p.theme.colors.background};
  elevation: 5;
`;
export const ModalText = styled.Text`
  color: ${(p) => p.theme.colors.text1};
  font-size: 18px;
  text-align: center;
  margin-bottom: 40px;
`;

export const ButtonGroup = styled.View`
  justify-content: space-between;
`;
