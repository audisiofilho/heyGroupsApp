import React, {useState} from 'react';
import {Text, Platform, TouchableOpacity} from 'react-native';

import {Container, Logo, Input, ButtonLogin, TextButtonLogin} from './styles';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Logo margin={Platform.OS === 'android' ? '55px' : '80px'}>
        HeyGroups
      </Logo>
      <Text style={{marginBottom: 20, color: '#000'}}>
        Converse, faça amigos, divirta-se!
      </Text>

      <Input
        value={name}
        onChange={text => setName(text)}
        placeholder="Qual seu nome?"
        placeholderTextColor="#99999b"
      />
      <Input
        value={email}
        onChange={text => setEmail(text)}
        placeholder="Qual seu email?"
        placeholderTextColor="#99999b"
      />
      <Input
        value={password}
        onChange={text => setPassword(text)}
        placeholder="Digite uma senha"
        placeholderTextColor="#99999b"
      />
      <ButtonLogin>
        <TextButtonLogin>Acessar</TextButtonLogin>
      </ButtonLogin>
      <TouchableOpacity>
        <Text style={{color: '#000'}}>Criar uma nova conta</Text>
      </TouchableOpacity>
    </Container>
  );
}
