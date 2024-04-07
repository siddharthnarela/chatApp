import { View, Text ,TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native'
import {React, useState} from 'react';
import {auth, db} from '../firebase';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { collection, getDoc, doc } from 'firebase/firestore';


export default function Register({navigation}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');
    const [key, setKey] = useState('');
    const [userKey, setUserKey] = useState('');

    // const user = auth.currentUser;

    // const displayName = user.displayName;
    // const photoURL = user.photoURL;

    const register = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL:profile ||"https://i.pinimg.com/736x/6b/08/76/6b087603862a127ea290e0a47ed932bf.jpg",
      })
    })
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      })
        
  
}

const userKeyCol = doc(db, "userKey", "first_key");

  getDoc(userKeyCol)
  .then((doc) =>{
    setUserKey(doc.data().key);
    console.log(doc.data().key);
  })
  .catch((error) => {
    alert(error.message);
  })

  const handleSubmit=()=>{
    if (key === userKey) {
      return register;
    } else {
      alert("Invalid Key");
    }
  }
         


  return (
    <KeyboardAvoidingView>
    <View className="flex flex-col items-center h-full w-full">
      <Image source={require("../assets/mainLogo2.png")} className="w-max h-48" resizeMode='contain'/>
      <TextInput className="bg-gray-200 p-2 rounded-md text-center w-80 text-black font-bold" value={name} onChangeText={(text) => setName(text)} placeholder='Name'/>
      <TextInput className="bg-gray-200 p-2 rounded-md text-center w-80 text-black font-bold mt-4" value={email} onChangeText={(text) => setEmail(text)} placeholder='Email'/>
      <TextInput className="bg-gray-200 p-2 rounded-md text-center w-80 text-black font-bold mt-4" value={profile} onChangeText={(text) => setProfile(text)} placeholder='Profile URl'/>
      <TextInput className="bg-gray-200 p-2 rounded-md text-center w-80 text-black font-bold mt-4" secureTextEntry value={key} onChangeText={(text) => setKey(text)} placeholder='Secret Key'/>
      <TextInput className="bg-gray-200 p-2 rounded-md text-center w-80 text-black font-bold mt-4" value={password} onChangeText={(text) => setPassword(text)} placeholder='Password'/>
      <TouchableOpacity onPress={register}><Text className="w-36 h-10 bg-black rounded-full mt-8 text-center text-white font-bold p-2">Register</Text></TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
  }