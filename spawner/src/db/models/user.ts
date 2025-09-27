import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
   clerkId : {type : String,required : true,unique : true},
   email : {type : String,required : true}
})

export default mongoose.model('User',UserSchema)