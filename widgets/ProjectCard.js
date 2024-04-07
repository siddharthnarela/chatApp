import * as Progress from 'react-native-progress';
import {
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { auth } from '../firebase';
// import CircularProgress from 'react-native-circular-progress-indicator';





const ProjectCard = ({projectName,discription,progress='0',userName, date, techStack, image}) => {
    return (
    <View>
    <View style={styles.project_card}>
        <View style={{position:'absolute',width:500,left:-10,top:-20}} className="flex flex-row items-center">
            <Image style={{height:40, width:40, borderRadius:50,backgroundColor:'white'}} source={{uri:image}}/>
            <Text style={{fontSize:13, fontWeight:'bold',height:20,maxWidth:'80%',backgroundColor:"white", color:'black', borderRadius:20,textAlign:'center',marginLeft:-10,zIndex:-1,paddingHorizontal:13,borderWidth:1}}>{userName}</Text>
        </View>

          <Text style={{color:'gray', fontSize:10, position:'absolute',right:10, top:5}}>{date}</Text>
        <View className=""> 
          <View>
            <Text style={{color:'#7DE2D1',marginTop:16,textAlign:'center'}} className="text-2xl font-bold max-w-5xl">{projectName}</Text>
            <Text style={{fontSize:13, textAlign:'center',height:75,marginTop:17,lineHeight:17}} className="text-gray-300 font-bold">{discription}</Text>
            <Text style={{color:'#A9DEF9',width:210,height:35}} className="text-sl font-extrabold">{techStack}</Text>

          </View>

        </View>

        

        </View>
          <View style={{right:-15,bottom:-40,position:'absolute',height:100, width:100, backgroundColor: '#191717',borderRadius:60,alignItems:'center', justifyContent:'center'}}>
            <Progress.Circle size={90} strokeCap={'round'} thickness={7} showsText={true} color="#00FFFF" progress={progress}/>
          {/* <CircularProgress
            radius={50}
            value={85}
            inActiveStrokeColor={'#2ecc71'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'#fff'}
            valueSuffix={'%'}
          /> */}

          </View>
        </View>
      
    )
}
        
export default ProjectCard;

const styles = StyleSheet.create({
    project_card:{
        width:320,
        height:200,
        backgroundColor:'#191717',
        borderRadius:10,
        borderWidth:1,
        borderColor:'grey',
        padding:10,
        marginTop:70,
        elevation:5,
        display:'flex',
        flexDirection: 'column',
        // justifyContent:'space-evenly',
        alignItems:'center',
        shadowColor: 'white',
        shadowOffset: { width: 10, height: 10,  },
        shadowOpacity: 1,
        shadowRadius: 2,
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
    })