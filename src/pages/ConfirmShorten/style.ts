import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(p) => p.theme.colors.background};
  flex: 1;
  justify-content: center;
`;
export const Message = styled.Text`
  text-align: center;
  color: ${(p) => p.theme.colors.text1};
  font-size: 18px;
  font-weight: bold;
`;
export const ShortUrlButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.colors.prim};
  padding: 20px;
  margin: 30px 0;
`;
export const ShortUrl = styled.Text`
  color: ${(p) => p.theme.colors.text1};
  font-size: 18px;
`;
export const LabeledFields = styled.View`
  flex-direction: row;
  margin: 5px 0;
`;
export const Label = styled.Text`
  color: ${(p) => p.theme.colors.text1};
  font-weight: bold;
  font-size: 16px;
  width: 70px;
`;
export const Date = styled.Text`
  color: ${(p) => p.theme.colors.text1};
  font-size: 16px;
`;
export const Original = styled.Text`
  color: ${(p) => p.theme.colors.text2};
  font-size: 16px;
`;
export const Sep = styled.View`
  margin: 10px;
`;
