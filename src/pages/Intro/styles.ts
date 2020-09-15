import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(p) => p.theme.colors.background};
  justify-content: center;
`;

export const Logo = styled.View`
  padding-bottom: 80px;
`;

export const Title = styled.Text`
  font-size: 48px;
  align-self: center;
  text-align: center;
  margin-top: -20px;
  color: ${(p) => p.theme.colors.text1};
`;
export const IntroMessage = styled.Text`
  color: ${(p) => p.theme.colors.text1};
  text-align: center;
  font-style: italic;
  font-size: 20px;
  margin-top: 40px;
  padding: 0 20px;
`;
export const ButtonGroup = styled.View`
  position: absolute;
  width: 100%;
  bottom: 20px;
`;
