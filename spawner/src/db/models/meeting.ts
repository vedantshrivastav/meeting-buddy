import mongoose from 'mongoose'

const MeetingSchema = new mongoose.Schema({
   userId : {type : mongoose.Schema.Types.ObjectId,ref : "User",required : true},
   meetId : {type : String,required : true},
   title : {type : String},
   status : {type : String , enum : ["pending", "in-progress", "completed", "failed"],default : "pending"
   }
})

export default mongoose.model('Meeting',MeetingSchema)