import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ChatMessage from '../../components/ChatMessage';

import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonContainer,
  ContainerInput,
  MainContainerInput,
  TextInput,
} from './styles';

export default function Messages({route}) {
  const {thread} = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState();

  const user = auth().currentUser.toJSON();
  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querrySnapshot => {
        const messages = querrySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });
        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({item}) => <ChatMessage data={item} />}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{width: '100%'}}
        keyboardVerticalOffset={100}>
        <ContainerInput>
          <MainContainerInput>
            <TextInput
              placeholder="Digite sua mensagem..."
              value={input}
              onChangeText={text => setInput(text)}
              multiline={true}
              autoCorrect={false}
            />
          </MainContainerInput>
          <TouchableOpacity>
            <ButtonContainer>
              <Feather name="send" size={22} color="#fff" />
            </ButtonContainer>
          </TouchableOpacity>
        </ContainerInput>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
