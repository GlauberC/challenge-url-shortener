import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: ${(p) => p.theme.colors.prim};
  margin: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 130px;
`;
export const Label = styled.Text`
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.text1};
  font-weight: bold;
`;
