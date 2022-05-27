import React, {useState} from 'react';
import {Container, ContainerInput, Input,ButtonSearch} from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Search() {
  const [input, setInput] = useState();
  return (
    <Container>
      <ContainerInput>
        <Input
          placeholder="Digite o nome do grupo..."
          value={input}
          onChangeText={text => setInput(text)}
          autoCapitalize={'none'}
        />
        <ButtonSearch>
          <MaterialIcons name="search" size={30} color="#fff" />
        </ButtonSearch>
      </ContainerInput>
    </Container>
  );
}
