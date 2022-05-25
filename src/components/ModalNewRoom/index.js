import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ModalNewRoom({setVisible, setUpdateScreen}) {
  const [roomName, setRoomName] = useState('');

  const user = auth().currentUser.toJSON();

  function handleButtonCreate() {
    if (roomName === '') return;

    firestore()
      .collection('MESSAGE_THREADS')
      .get()
      .then(snaoshot => {
        let myThreads = 0;

        snaoshot.docs.map(docItem => {
          if (docItem.data().owner === user.uid) {
            myThreads += 1;
          }
        });
        if (myThreads >= 4) {
          alert('Você atingiu o limite de grupos por usuario!');
        } else {
          createRoom();
        }
      });
  }

  function createRoom() {
    firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado!`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then(docRef => {
        docRef
          .collection('MESSAGES')
          .add({
            text: `Grupo ${roomName} criado!`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true,
          })
          .then(() => {
            setVisible();
            setUpdateScreen();
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modal}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Criar um novo Grupo?</Text>
        <TextInput
          value={roomName}
          onChangeText={text => setRoomName(text)}
          placeholder="Qual o nome do seu grupo?"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={handleButtonCreate}>
          <Text style={styles.buttonText}>Criar Grupo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={setVisible}>
          <Text style={{color: '#000'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(34,34,34,0.4)',
  },
  modal: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    marginTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#000',
  },
  input: {
    borderRadius: 4,
    height: 45,
    backgroundColor: '#ddd',
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  buttonCreate: {
    borderRadius: 4,
    backgroundColor: '#179bd7',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
});
