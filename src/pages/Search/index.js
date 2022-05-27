import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {Container, ContainerInput, Input, ButtonSearch} from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useIsFocused} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Search() {
  const isFocused = useIsFocused();

  const [input, setInput] = useState();
  const [user, setUser] = useState();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocused]);

  async function handleSearch() {
    if (input === '') return;

    const responseSearch = await firestore()
      .collection('MESSAGE_THREADS')
      .where('name', '>=', input)
      .where('name', '<=', input + '\uf8ff')
      .get()
      .then(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            lastMessage: {text: ''},
            ...documentSnapshot.data(),
          };
        });
        setGroups(threads);
        console.log(threads);
        setInput('');
        Keyboard.dismiss();
      });
  }

  return (
    <Container>
      <ContainerInput>
        <Input
          placeholder="Digite o nome do grupo..."
          value={input}
          onChangeText={text => setInput(text)}
          autoCapitalize={'none'}
        />
        <ButtonSearch onPress={handleSearch}>
          <MaterialIcons name="search" size={30} color="#fff" />
        </ButtonSearch>
      </ContainerInput>
    </Container>
  );
}
