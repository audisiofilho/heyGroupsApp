import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Modal} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Container, HeaderRoom, HeaderRoomLeft, Title} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalViseble] = useState(false);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    console.log(hasUser);
    setUser(hasUser);
  }, [isFocused]);

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('SignIn');
      })
      .catch(() => {
        console.log('sem usuario');
      });
  }
  return (
    <Container>
      <HeaderRoom>
        <HeaderRoomLeft>
          {user && (
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <Title>Grupos</Title>
        </HeaderRoomLeft>
        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </HeaderRoom>
      <FabButton setVisible={() => setModalViseble(true)} userStatus={user} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewRoom setVisible={() => setModalViseble(false)} />
      </Modal>
    </Container>
  );
}
