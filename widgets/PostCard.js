import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';


const PostCard = ({name, profileImage, postContent, image, time}) => {
    return(

    <View style={styles.cardContainer}>
        {/* <View style={styles.userCard}>
            <Image style={{height:50,width:50,borderRadius:50,borderColor:'black',borderWidth:1,right:-15,zIndex:1}} source={{uri:profileImage}} />
            <Text style={{textAlignVertical:'center',textAlign:'center',height:25,width:160,borderRadius:50,fontSize:15,color:'white', fontWeight:'bold',backgroundColor: '#282C35'}}>
                {name}
            </Text>
        </View> */}
        <View style={{position:'absolute',width:500,left:-10,top:-20}} className="flex flex-row items-center">
            <Image style={{height:40, width:40, borderRadius:50,backgroundColor:'white'}} source={{uri:profileImage}}/>
            <Text style={{fontSize:13, fontWeight:'bold',height:20,maxWidth:'80%',backgroundColor:"white", color:'black', borderRadius:20,textAlign:'center',marginLeft:-10,zIndex:-1,paddingHorizontal:13,borderWidth:1}}>{name}</Text>
        </View>
      
                <Text style={{color:'gray',fontSize:11,marginRight:-200, marginTop:-10}}>{time}</Text>
                {/* <Image style={{height:350,width:'100%',borderRadius:20,borderRadius:20}} source={{uri:image}} resizeMode='contain' /> */}
   
            
            <Text style={{marginBottom:20,top:10,textAlign:'center',fontSize:16,fontWeight:'bold'}}>
                {postContent}
            </Text>

    </View>
    )

}

export default PostCard;

const styles = StyleSheet.create({
    cardContainer: {
        // height:420,
        maxHeight:900,
        width:'90%', 
        display:'flex',
        flex:1,
        flexDirection: "column", 
        justifyContent: "center",
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.65,
        // shadowRadius: 3.84,
        elevation: 4,
        marginVertical:30,
        padding:15,
        borderWidth:0.4,
        borderColor:'gray'
    },

    userCard: {
        display:'flex',
        flexDirection: "row", 
        position:'absolute',
        top:-20,
        left:-30,
        alignItems:'center',
    },
})