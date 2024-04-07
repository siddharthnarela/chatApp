import {StatusBar,StyleSheet, Image, View, Text, SafeAreaView, Modal, TextInput,TouchableOpacity, ScrollView } from 'react-native';
import {React, useEffect, useRef, useState} from 'react';
import ProjectCard from '../widgets/ProjectCard';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Slider from '@react-native-community/slider';

export default function Widget() {

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so we add 1
  const currentDay = new Date().getDate();
  const currentTimeString = new Date().toLocaleTimeString();

  const [projects , setProjects] =  useState([]) ;
  const [isModalVisible , setIsModalVisible] =  useState(false) ;

  const projectsCol = collection(db, "project");
  const inputRef = useRef(null);

  const [projectName , setProjectName] = useState('');
  const [discription , setDiscription] = useState('');
  const [techStack , setTechStack] = useState('');
  const [progress , setProgress] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(projectsCol, orderBy('timestamp', 'desc')), (snapshot) => {
      const dataList = snapshot.docs.map((doc) => ({
        id: doc.id,
      ...doc.data(),
      }))
      setProjects(dataList);
    })

    return () => unsubscribe();
  }, [])



  const projectSubmit = async () => {
    addDoc(projectsCol, {
      name : auth.currentUser.displayName,
      projectName : projectName,
      discription : discription,
      techStack : techStack,
      progress : progress,
      profileImage : auth.currentUser.photoURL,
      timestamp : `${currentDay}/${currentMonth}/${currentYear}  ${currentTimeString}`,


    })
    .then(() => {
      setDiscription('');
      setProgress('');
      setProjectName('');
      setTechStack('');
    })
    setIsModalVisible(false);
    alert("Your Project has been submitted!");

  }

   

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../assets/mainLogo2.png')} resizeMode='contain' style={styles.logo} />
        </View>

        <Modal visible={isModalVisible} animationType='slide'>
            
                <SafeAreaView className="flex flex-col items-center mt-20">

                  <View>
                    <Text className="text-3xl text-center font-extrabold">PROJECT DETAILS</Text>
                    <TextInput className="text-xl bg-gray-200 w-80 h-12 px-3 rounded-lg mt-7 font-bold" placeholder='Project Name' value={projectName} onChangeText={(text) => setProjectName(text)} />
                    <TextInput className="text-xl bg-gray-200 w-80 h-12 px-3 rounded-lg mt-7 font-bold" placeholder='Discription' value={discription} onChangeText={(text) => setDiscription(text)} />
                    <TextInput className="text-xl bg-gray-200 w-80 h-12 px-3 rounded-lg mt-7 font-bold" placeholder='Tech Stack' value={techStack} onChangeText={(text) => setTechStack(text)} />
                    <TextInput className="text-xl bg-gray-200 w-80 h-12 px-3 rounded-lg mt-7 font-bold" placeholder='Progress (%)' value={progress} onChangeText={(text) => setProgress(text)}/>
                    {/* <Text>{progress}</Text>
                    <Slider
  style={{width: 300, height: 40}}
  minimumValue={0}
  maximumValue={100}
  minimumTrackTintColor="#000000"
  maximumTrackTintColor="#000000"
  value={progress}
  lowerLimit={0}
  upperLimit={100}
  onValueChange={(text => setProgress(text))}
/> */}
                  
                  </View>
                

                    <View className="flex flex-row space-x-8 mt-10">
                        
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}><Text className="text-2xl font-bold w-24 h-10 p-1 text-center rounded-2xl bg-slate-600 text-white" >CLOSE</Text></TouchableOpacity>
                        <TouchableOpacity onPress={projectSubmit} ><Text className="text-2xl font-bold w-24 h-10 p-1 text-center rounded-2xl bg-slate-600 text-white" >POST</Text></TouchableOpacity>
                        
                    </View>

                </SafeAreaView>

                <StatusBar hidden={true} />
            
        </Modal>


      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <LinearGradient
        colors={['#29323c','#485563']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.add_button}>
        <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>ADD NEW PROJECT</Text>
        <TouchableOpacity style={{right:20}} onPress={() => setIsModalVisible(true)} >
          <Ionicons name="add-circle-sharp" size={40} color="white" style={{zIndex:1,right:-20}} />
        </TouchableOpacity>
      </LinearGradient>
        <View style={styles.project_container}>
          <LinearGradient
            colors={['#D4145A','#FBB03B']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.card1}>
              <Text style={{color:'white', fontSize:70, fontWeight:'bold'}}>24</Text>
              <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>PROJECTS DONE</Text>

          </LinearGradient>

          <LinearGradient
            colors={['#2E3192','#1BFFFF']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.card2}>

              <Text style={{color:'white', fontSize:70, fontWeight:'bold'}}>06</Text>
              <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>LIVE PROJECTS</Text>
          </LinearGradient>

          
        </View>
        <View style={styles.project_card_container}>

        
        {projects.map((item) => (
          
          <ProjectCard 
          projectName={item.projectName} 
          userName={item.name} 
          progress={item.progress/100} 
          date={item.timestamp} 
          techStack={item.techStack} 
          discription={item.discription} 
          image= {item.profileImage}
          
          /> 
        ) )}

 
        </View>
      </ScrollView>
      <StatusBar hidden={true} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column',
    // justifyContent:'center',
    alignItems:'center',
    height:'100%',
    width:'100%',
    backgroundColor:'#080808',
 
  },
  header:{
    backgroundColor:'white',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    height:50,
    alignItems:'center',
    width:'100%',
    borderBottomEndRadius:100,
    borderBottomStartRadius:100,
    borderBottomWidth:7,
    borderColor:'#36454F',
    // marginBottom:40,

  },

  logo:{
    width:110,
  },

  

  add_button:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'92%',
    height:50,
    backgroundColor:'#191717',
    borderRadius:10,
    bottom:20,
    paddingHorizontal:15,
    
    
  },

  scrollViewContent:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    top:20,
    // width:'100%',
    // height:'100%',
    paddingVertical:25,
    // backgroundColor:'#191717',   //rrrrrrrrrrrrrrrrrrrrrrrrr
    // justifyContent:'center',
  },

  project_container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    // alignItems:'center',
    // top:30,
    width:'100%',
    flex:1,
    
  },

  card1:{
    width:150,
    height:200,
    // backgroundColor:'#191717',
    borderRadius:10,
    padding:10,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  
  card2:{
    width:150,
    height:200,
    // backgroundColor:'#191717',
    borderRadius:10,
    padding:10,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center',
  },

  project_card_container:{
    // marginTop:10,
    width:'100%',
    // height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },

  project_card:{
    width:'92%',
    height:150,
    backgroundColor:'#191717',
    borderRadius:10,
    borderWidth:2,
    borderColor:'grey',
    padding:10,
    marginTop:20,
    elevation:6,
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-between',
    alignItems:'center',
  },

  project_card_name:{
    fontSize:18,
    fontWeight:'bold',
    color:'white',
  },

  project_card_user:{
    fontSize:12,
    fontWeight:'bold',
    color:'white',
    alignSelf:'flex-end',
    color:'#ccf1f6',
  }

});