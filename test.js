import { collection, addDoc } from "firebase/firestore"; 
import {db} from "../firebase";


await addDoc(collection(db, "users"),{
    name:"Yash",
    message:"Hello"
});

