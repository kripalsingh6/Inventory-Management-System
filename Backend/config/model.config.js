import mongoose from "mongoose";
import 'dotenv';
   

const connectMongDb = async()=>{
    try{

        const mongoURI = Process.env.MONGO_URI

        const connect = await mongoose.connect(mongoURI);

        console.log(`mongoDB is connected ${connect.connection.host}`);

    }catch(error){
       console.error(`mongodb is not connected: ${error.message}`);
       process.exit(1);
    }
}

export default connectMongDb;