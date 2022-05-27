import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  Alert,
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
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
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
          }
        });
    }
    getChats();

    return () => {
      isActive = false;
    };
  }, [isFocused, updateScreen]);

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

  function deleteGroup(ownerId, idGroup) {
    if (ownerId !== user?.uid) return;

    Alert.alert('Atenção!', 'Você deseja excluir este grupo?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => handleDeleteGroup(idGroup),
      },
    ]);
  }

  async function handleDeleteGroup(idGroup) {
    await firestore().collection('MESSAGE_THREADS').doc(idGroup).delete();

    setUpdateScreen(!updateScreen);
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
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
          <ChatList
            data={item}
            deleteGroup={() => deleteGroup(item.owner, item._id)}
            userStatus={user}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <FabButton setVisible={() => setModalViseble(true)} userStatus={user} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewRoom
          setVisible={() => setModalViseble(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>
    </Container>
  );
}
