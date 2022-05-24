import React from 'react';
import {TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {Container, HeaderRoom, HeaderRoomLeft, Title} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ChatRoom() {
  const navigation = useNavigation();

  function handleSignOut(){
    auth().signOut().then(()=>{
      navigation.navigate("SignIn")
    }).catch(()=>{
      console.log("sem usuario");
    })
  }
  return (
    <Container>
      <HeaderRoom>
        <HeaderRoomLeft>
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Title>Grupos</Title>
        </HeaderRoomLeft>
        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </HeaderRoom>
    </Container>
  );
}
