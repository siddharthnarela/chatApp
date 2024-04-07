import {StyleSheet, View, Text, Button } from 'react-native'
import React from 'react'
import { auth , db } from '../firebase';
import {signOut } from "firebase/auth";
import {createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs,getDoc, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';
import Feed from './feed';
import Chat from './chat';
import Widget from './widget';
import Profile from './profile';

export default function Home({navigation}) {

    const chat = collection(db, 'chat');
    const chatDoc = doc(db,"chat", "chat")

    // getDocs(chat)
    //  .then((snapshot) => {
    //   let chats =[];
    //   snapshot.docs.forEach((doc) => {
    //     chats.push({ ...doc.data(), id :doc.id})
    //   })
    //   console.log(chats);
    //  })
    //  .catch((error) => {
    //   console.log(error.message);
    //  });

    //  onSnapshot(chat, (snapshot) =>{
    //   let chats =[];
    //   snapshot.docs.forEach((doc) => {
    //     chats.push({ ...doc.data(), id :doc.id})
    //   console.log(chats);

    //  })
    //  });

     // add a new document in collection 'chat'

    //  addDoc(chat, {
    //   name:"Harsh",
    //   message:"First message"
    //  })
    //  .then()
    //  .catch((error) => {
    //   console.log(error.message);
    //  });

    //  deleteDoc(chatDoc)
    //   .then()
    //   .catch((error) => {
    //   console.log(error.message);
    //  });
     
  

const Tab = createBottomTabNavigator();



  return (
    <Tab.Navigator
      initialRouteName='feed'
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'black',
        tabBarHideOnKeyboard: true,
      }}
      >
      
        <Tab.Screen options={{
          tabBarShowLabel:false,
          tabBarIcon : ({focused}) => {
            if(focused){
              return <Ionicons name="home" size={35} color="#131834"/>
            }else{
              return <Ionicons name="home-outline" size={30} color="grey"/>
            }
          },
        }} name="feed" component={Feed}/>

        <Tab.Screen options={{
          tabBarShowLabel:false,
          tabBarIcon : ({focused}) => {
            if(focused){
              return <Ionicons name="chatbubble-ellipses"  size={40} color="#131834"/>
            }else{
              return <Ionicons name="chatbubble-ellipses-outline" size={35} color="grey"/>
            }
          }, 
        }} name="chat" component={Chat}/>


      <Tab.Screen options={{
        tabBarShowLabel:false,
        tabBarIcon : ({focused}) => {
          if(focused){
            return <Ionicons name="code-slash" size={40} color="#131834"/>
          }else{
            return <Ionicons name="code-slash-outline" size={30} color="grey"/>
          }
        },
      }} name="widget" component={Widget}/>

        <Tab.Screen options={{
          tabBarShowLabel:false,
          tabBarIcon : ({focused}) => {
            if(focused){
              return <Ionicons name="person"  size={35} color="#131834"/>
            }else{
              return <Ionicons name="person-outline" size={30} color="grey"/>
            }
          },
        }} name="profile" component={Profile}/>


      </Tab.Navigator>
  )
}