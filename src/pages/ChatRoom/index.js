import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Container, HeaderRoom, HeaderRoomLeft, Title} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';
import ChatList from '../../components/ChatList';

import firestore from '@react-native-firebase/firestore';

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalViseble] = useState(false);

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    console.log(hasUser);
    setUser(hasUser);
  }, [isFocused]);

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()
        .then(snapshot => {
          const threads = snapshot.docs.map(documentSnapshot => {
            return {
              _id: documentSnapshot.id,
              name: '',
              lastMessage: {
                text: '',
              },
              ...documentSnapshot.data(),
            };
          });

          if (isActive) {
            setThreads(threads);
            setLoading(false);
            console.log(threads);
          }
        });
    }
    getChats();

    return () => {
      isActive = false;
    };
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
      {loading && (
        <ActivityIndicator
          size={'large'}
          color="#179bd7"
          style={{alignSelf: 'center'}}
        />
      )}
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ChatList data={item}/>
        )}
        showsVerticalScrollIndicator={false}
      />
      <FabButton setVisible={() => setModalViseble(true)} userStatus={user} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewRoom setVisible={() => setModalViseble(false)} />
      </Modal>
    </Container>
  );
}
