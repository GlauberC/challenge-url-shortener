import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: ${(p) => p.theme.colors.prim};
  margin: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
export const Label = styled.Text`
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.text1};
  font-weight: bold;
`;
