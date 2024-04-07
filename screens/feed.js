import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { auth, db } from '../firebase';
import { getStorage, ref } from "firebase/storage";


import { 
  StyleSheet, 
  Text, 
  View,
  Modal,
  Button,
  Switch,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  SafeAreaView,
  ScrollView} from 'react-native';
  import {React, useEffect} from 'react';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { useState } from 'react';
  import PostCard from '../widgets/PostCard';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {Pinchable} from 'react-native-pinchable';
  
  
export default function Feed({navigation}) {


    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so we add 1
    const currentDay = new Date().getDate();
    const currentTimeString = new Date().toLocaleTimeString();
 
    const [isModalVisible , setIsModalVisible] = useState(false);
    const [postContent , setPostContent] = useState("");
    
    const [posts , setPosts] = useState([]);
    
    const postref = collection(db, "post");


    // Create a root reference
const storage = getStorage();


// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, '../assets/write_logo.png');
    
  useEffect(() => {
  const unsubscribe = onSnapshot(query(postref, orderBy('timestamp', 'desc')), (snapshot) => {
    const dataList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(dataList);
    
  });

  return () => unsubscribe();
  }, []);

  const sendPost = () => {
    addDoc(postref, {
        name:auth.currentUser.displayName,
        content: postContent,
        profileImage: auth.currentUser.photoURL,
        timestamp : `${currentDay}/${currentMonth}/${currentYear}  ${currentTimeString}`
    })
    .then(() => {
      setPostContent('');
      alert("Your post has been sent!");
    })
    setIsModalVisible(false);

    }




  return (
    <SafeAreaView style={styles.container}>
        
    <View style={styles.header}>
        <Image source={require('../assets/mainLogo.png')} resizeMode='contain' style={styles.logo} />
        <TouchableOpacity style={{right:20}} onPress={() => setIsModalVisible(true)} >
            <Ionicons name="add-circle-sharp" size={40} color="white" style={{zIndex:1,}} />
        </TouchableOpacity>

    </View>
    
        <Modal visible={isModalVisible} animationType='slide'>
            
                <SafeAreaView style={styles.post}>
                <LinearGradient
                  colors={['black','#29323c']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addImage}>
                <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>ADD IMAGE</Text>
                <TouchableOpacity style={{right:20}} onPress={() => ImagePicker()} >
                <Ionicons name="add-circle-sharp" size={40} color="white" style={{zIndex:1,right:-20}} />
                </TouchableOpacity>
                </LinearGradient>



                    <Image resizeMode='cover' source={require('../assets/write_logo.png')}  style={styles.write_logo}/>
                    <View style ={styles.post_main}>
                        <TextInput value={postContent} onChangeText={(text) => setPostContent(text)} style={styles.input_post} multiline />
                    </View>

                    <View style={styles.post_footer}>
                        
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}><Text style={styles.post_button} >CLOSE</Text></TouchableOpacity>
                        <TouchableOpacity onPress={sendPost}><Text style={styles.post_button} >POST</Text></TouchableOpacity>
                        
                    </View>

                </SafeAreaView>

                <StatusBar hidden={true} />
            
        </Modal>

    <ScrollView style={styles.feed_container}>
      <View  style={styles.post_container}> 

  
        {posts.map((item) => (
          <PostCard
          name={item.name}
          profileImage={item.profileImage}
          postContent={item.content}
          image={'https://cdn.statcdn.com/Infographic/images/normal/27421.jpeg'}
          time={item.timestamp}
          />
        ))}

  
      </View>
    </ScrollView>
    <StatusBar hidden={true} />
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  
    body:{
        backgroundColor:'black',
        
    },

    container:{
    display:'flex',
    flex:1,
    flexDirection:'column',
    backgroundColor:'#191717',
    
  },

  header:{
    backgroundColor:'#191717',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    height:80,
    alignItems:'center',  
  },


  logo:{
    width:150,
    left:20

  },

  feed_container:{
    // height:'100%',
    width:'100%',
    backgroundColor:'#fff',
    display:'flex',
  },

  post_container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    height:'100%'
  },

  write_logo:{
    width:200,
    height:200,
    zIndex:1,
    position:'absolute',
    top:150,
    left:60,
    opacity:0.1,
    zIndex:-1,
  },

  post:{
    display: 'flex',
    flexDirection: 'column',
    margin:40,
    top:10,
    justifyContent: 'center',
  },

  addImage:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    height:50,
    backgroundColor:'#191717',
    borderRadius:10,
    bottom:20,
    paddingHorizontal:15
  },
  
  post_footer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    
  },
  post_button:{
    backgroundColor:"#191717",
    color: "white",
    width:130,
    height:50,
    fontSize:23,
    // fontFamily:'Arial',
    borderRadius:20,
    textAlign: 'center',
    top:30,
    // alignItems: 'center',
    // justifyContent: 'center',
    textAlignVertical: 'center'
  },

  input_post:{
    borderWidth:3,
    borderRadius:20,
    borderColor:"#000",
    fontSize:20,
    height:500,
    padding:30,
    textAlign:'center',
    fontWeight: 'bold',
  }

});

