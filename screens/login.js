import { View, Text,TextInput, KeyboardAvoidingView,TouchableOpacity, Image } from 'react-native'
import {React, useEffect, useState} from 'react';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';



export default function Login({navigation}) {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        navigation.replace('Home');
      }

    })

    return unsubscribe;

  }, [])


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const login = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert(error.message);
          // ..
        });
    }
  return (
    <KeyboardAvoidingView>
    <View className="flex flex-col items-center justify-start h-full w-full">
      <Image source={require("../assets/mainLogo2.png")} className="w-60 h-60 mt-20" resizeMode='contain'/>
      <TextInput className="bg-gray-200 p-2 rounded-md text-center w-80 text-black font-bold mt-4" value={email} onChangeText={(text) => setEmail(text)} placeholder='Email'/>
      <TextInput className="bg-gray-200 p-2 rounded-md text-center w-80 text-black font-bold mt-6" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholder='Password'/>
      <TouchableOpacity onPress={login}><Text className="w-36 h-10 bg-black rounded-full mt-8 text-center text-white font-bold p-2">Login</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text className="mt-10 text-gray-500">Register</Text></TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
}