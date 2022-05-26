import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ChatMessage from '../../components/ChatMessage';

export default function Messages({route}) {
  const {thread} = route.params;
  const [messages, setMessages] = useState([]);

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
    </SafeAreaView>
  );
}
