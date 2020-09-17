import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(p) => p.theme.colors.background};
`;
export const Sep = styled.View`
  margin: 5px;
`;
export const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Message = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 20px;
  color: ${(p) => p.theme.colors.text1};
`;

export const UrlContainer = styled.View`
  margin: 30px 10px;
`;
export const UrlDate = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${(p) => p.theme.colors.text1};
`;
export const LabeledView = styled.View`
  flex-direction: row;
  margin: 5px 0;
`;
export const Label = styled.Text`
  color: ${(p) => p.theme.colors.text1};
  width: 70px;
  font-weight: bold;
`;
export const UrlOriginal = styled.Text`
  color: ${(p) => p.theme.colors.text2};
`;
export const UrlShortButton = styled.TouchableOpacity``;
export const UrlShort = styled.Text`
  color: ${(p) => p.theme.colors.prim};
  font-size: 16px;
`;
