import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${(p) => p.theme.colors.prim};
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
  color: ${(p) => p.theme.colors.text3};
  font-weight: bold;
`;
