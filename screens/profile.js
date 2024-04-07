import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import {auth} from '../firebase';
import { signOut } from 'firebase/auth';


export default function Profile({navigation}) {

  signout = () => {
    signOut(auth)
    .then(() => {
      console.log('User signed out!');
      // Navigate to the login screen
      navigation.replace('Login');
    })
    .catch((error) => {
      alert(error.message);
    });
  }
 
  return (
    <View>
      <View style={styles.header}>
            <Image source={require('../assets/mainLogo.png')} resizeMode='contain' style={styles.logo} />
      </View>
    <View className="flex flex-col items-center mt-8 w-full h-full">
      <View className="flex flex-col items-center  w-80 h-3/4 bg-gray-800 rounded-full">
        <Image style={{width: 250, height: 250,marginTop:30}} className="rounded-full" source={{uri:auth.currentUser.photoURL}} />
        <View className="flex flex-col items-center justify-center w-full h-60">
          <Text className="text-white text-left text-base font-bold">User Name: {auth.currentUser.displayName}</Text>
          <Text className="text-white text-left text-base font-bold">User Email: {auth.currentUser.email}</Text>
        </View>

        <TouchableOpacity onPress={signout}>
          <Text
          className="w-26 h-15 bg-white p-3 text-xl rounded-full font-bold"
          >SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

const  styles = StyleSheet.create({
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
    width:120,
  },
})