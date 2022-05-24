import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ModalNewRoom({setVisible}) {
  const [roomName, setRoomName] = useState('');
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

        <TouchableOpacity style={styles.buttonCreate}>
          <Text style={styles.buttonText}>Criar Grupo</Text>
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
    padding:15
  },
  title:{
      marginTop: 14,
      textAlign:'center',
      fontWeight:'bold',
      fontSize: 19,
      color: '#000'
  },
  input:{
      borderRadius: 4,
      height: 45,
      backgroundColor:"#ddd",
      marginVertical: 15,
      fontSize: 16,
      paddingHorizontal: 5,
  },
  buttonCreate:{
      borderRadius:4,
      backgroundColor: "#179bd7",
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonText:{
      fontSize:19,
      fontWeight: 'bold',
      color: "#fff"
  }

});
