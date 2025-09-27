import mongoose from 'mongoose'

const SummarySchema = new mongoose.Schema({
   meetingId : {type : mongoose.Schema.Types.ObjectId,ref : "Meeting",required : true},
   summary : {type : String,required : true}
})

export default mongoose.model('Summary',SummarySchema)