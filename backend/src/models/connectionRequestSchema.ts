import mongoose, { Document, Model } from "mongoose";


interface connectRequestProps extends Document{
  fromUserId:mongoose.Types.ObjectId,
  toUserId:mongoose.Types.ObjectId,
  status:'interested' | 'ignored'
}

const connectRequestSchema = new mongoose.Schema<connectRequestProps>({
  fromUserId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
  },
  toUserId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
  },
  status:{
    type:String,
    enum:{
      values:["interested","ignored"],
      message:'validator failed  with value `{VALUE}`'
    }
  }
});

connectRequestSchema.pre("save", function(next){
  const request = this
  if(request.fromUserId.equals(request.toUserId)){
    throw new Error("Cannot send Request to your self!")
  }
  next()
})

export const ConnectionRequest: Model<connectRequestProps> = mongoose.model<connectRequestProps>("ConnectionRequest", connectRequestSchema);