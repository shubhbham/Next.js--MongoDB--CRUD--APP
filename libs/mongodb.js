import mongoose from 'mongoose';

const connectMongoDB = async () =>{
 try{ 
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected mongo db");
 }catch (error){
  console.log("error connecting");
 }
}

export default connectMongoDB;