import mongoose from 'mongoose'

const MeetingSchema = new mongoose.Schema({
   userId : {type : mongoose.Schema.Types.ObjectId,ref : "User",required : true},
   meetId : {type : String,required : true},
   title : {type : String}
})

export default mongoose.model('Meeting',MeetingSchema)