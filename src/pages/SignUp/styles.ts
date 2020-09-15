import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${(p) => p.theme.colors.background};
`;
export const Form = styled.View`
  padding: 20px 10px;
`;
export const ButtonGroup = styled.View`
  padding: 40px 0;
`;
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
