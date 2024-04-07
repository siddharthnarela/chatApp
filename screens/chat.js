import {Platform,Image,StyleSheet, View, Text, ScrollView, ImageBackground, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Linkify } from 'react-native'
import {React, useEffect, useRef, useState} from 'react';
import {auth, db} from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp, onSnapshot,query, getFirestore, orderBy} from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// Get the current user


export default function Chat() {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so we add 1
    const currentDay = new Date().getDate();
    const currentTimeString = new Date().toLocaleTimeString();

    const user = auth.currentUser;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef(null);
    const inputRef = useRef(null);
    
    const chat = collection(db, "chat");
    
// useEffect(() => {
//   const db = getFirestore();
//   const unsubscribe = onSnapshot(chat, (snapshot) => {
//     const messagesData = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setMessage(messagesData);
//   });


useEffect(() => {
  const unsubscribe = onSnapshot(query(chat, orderBy('timestamp', 'asc')), (snapshot) => {
    const dataList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(dataList);

    // Scroll to the bottom of the ScrollView after updating the messages
    setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: false,marginBottom:50 });
      }, 10);
  });

  return () => unsubscribe();
}, []);
    
    
    // send message function 
    const sendMessage = () => {
    addDoc(chat, {
        name:user.displayName,
        message: message,
        timestamp: `${currentDay}/${currentMonth}/${currentYear}  ${currentTimeString}`,
    })
    .then( () => {
      setMessage('');
    })}

    return (
        <View style={styles.container}>
            
            
          <KeyboardAvoidingView
          inverted
          contentContainerStyle={{
          flexDirection: 'column-reverse',
          paddingVertical: 16,
        }}
        keyboardShouldPersistTaps="handled"
          >
          <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView 
          ref={scrollViewRef}
          inverted
          contentContainerStyle={{ paddingBottom: 80,padding:11}}
          style={styles.messageContainer}>
         {messages.map((item) => (
          <View style={{
            alignSelf: item.name === user.displayName ? 'flex-end' : 'flex-start',
            backgroundColor: item.name === user.displayName ? '#04B5D7' : '#FFD333',
            padding: 7,
            marginVertical: 20,
            maxWidth: '80%',
            borderRadius: 10,
          }} key={item.id}>

          {/* <Image style={{width:20,height:20}} resizeMode='contain' source={{uri:item.photoURL}}/> */}
          <Text style={item.name === user.displayName ? {display:'none'} : {fontWeight:"bold",fontSize:12,position:"absolute",marginTop:-18,marginLeft:5, color:"gray"}}>{item.name}</Text>
          <Text style={{fontWeight:"bold",fontSize:16, color:item.name === user.displayName ? '#333333' : '#333333'}}>{item.message}</Text>
          <Text style={{fontWeight:"bold",fontSize:7,marginTop:3, color:"white",alignSelf: item.name === user.displayName ? 'flex-end' : 'flex-start'}}>{item.timestamp}</Text>
          
        </View>
    ))}

          </KeyboardAwareScrollView>

             
          </View>


          <View style={styles.inputContainer}>
            <TextInput ref={input => { this.textInput = input }} multiline style={styles.inputMain} value={message} onChangeText={(text) => setMessage(text)} placeholder='Message...'/>
            <TouchableOpacity onPress={sendMessage}>
              <Text>
              <Ionicons name="send" size={37} color="white"/>
              </Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
   
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // marginTop:20,
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent:'center',
    
  },

  inputContainer: {
    width:"100%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    marginBottom:5,
    margin:1,
    justifyContent:"space-evenly",
  },

  messageContainer: {
    marginTop:40,
    paddingTop:50,
    paddingBottom:-50
    // padding:2,
  },

  inputMain: {
    width: "90%" ,
    height:40,
    textAlign:'left',
    padding:7,
    backgroundColor:"#dddddd",
    borderRadius:10,
    fontWeight: "bold",
    color:"black"
    

  },

  // messageMain: {
  //   alignSelf: item.name === user.name ? 'flex-end' : 'flex-start',
  //   backgroundColor: message.userId === currentUserId ? 'green' : 'blue',
  //   padding: 10,
  //   marginVertical: 5,
  //   maxWidth: '80%',
  //   borderRadius: 10,
  // },

  header:{
    backgroundColor:'#191717',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    height:50,
    alignItems:'center',
    width:'100%',
    borderBottomEndRadius:100,
    borderBottomStartRadius:100,
    marginBottom:10,

  },

  logo:{
    width:150,
  },
})