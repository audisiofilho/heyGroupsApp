import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`;

export const Logo = styled.Text`
  margin-top: ${props => props.margin};
  font-size: 28px;
  color: #000;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  color: #121212;
  background-color: #ebebeb;
  width: 90%;
  border-radius: 6px;
  margin-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
  height: 50px;
`;

export const TextButtonLogin = styled.Text`
    color: #fff;
    font-size: 19px ;
    font-weight: bold ;
`;

export const ButtonLogin = styled.TouchableOpacity`
    width:90% ;
    height: 50px ;
    justify-content: center ;
    align-items: center ;
    margin-bottom: 10px ;
    border-radius: 6px ;
    background-color: #121212 ;
`;
