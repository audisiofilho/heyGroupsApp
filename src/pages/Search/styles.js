import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
export const ContainerInput = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
`;
export const Input = styled.TextInput`
  background-color: #ebebeb;
  margin-left: 10px;
  width: 80%;
  padding: 5px;
  border-radius: 4px;
`;
export const ButtonSearch = styled.TouchableOpacity`
  background-color: #179bd9;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  width: 15%;
  margin-left:5px ;
  margin-right: 10px;
`;
