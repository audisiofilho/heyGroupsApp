import React, {useState} from 'react';
import {Text, Platform, TouchableOpacity} from 'react-native';

import {Container, Logo, Input, ButtonLogin, TextButtonLogin} from './styles';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [type, setType] = useState(false);

  function handleLogin() {
    if (type) {
      if (name === '' || email === '' || password === '') return;

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          user.user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              navigation.goBack();
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.log(error);
        });
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.goBack();
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.log(error);
        });
    }
  }

  return (
    <Container>
      <Logo margin={Platform.OS === 'android' ? '55px' : '80px'}>
        hey<Text style={{color: '#179bd7'}}>
            Groups!
          </Text>
      </Logo>
      <Text style={{marginBottom: 20, color: '#000'}}>
        Converse, faça amigos, divirta-se!
      </Text>

      {type && (
        <Input
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Qual seu nome?"
          placeholderTextColor="#99999b"
        />
      )}
      <Input
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Qual seu email?"
        placeholderTextColor="#99999b"
      />
      <Input
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Digite sua senha"
        placeholderTextColor="#99999b"
        secureTextEntry={true}
      />
      <ButtonLogin
        style={{backgroundColor:'#179bd7'}}
        onPress={handleLogin}>
        <TextButtonLogin>{type ? 'Cadastrar' : 'Acessar'}</TextButtonLogin>
      </ButtonLogin>
      <TouchableOpacity onPress={() => setType(!type)}>
        <Text style={{color: '#000'}}>
          {type ? 'Já possuo uma conta' : 'Criar uma nova conta'}
        </Text>
      </TouchableOpacity>
    </Container>
  );
}
