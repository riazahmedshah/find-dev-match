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
      values:["interested","ignored","acepted","rejected"],
      message:'validator failed  with value `{VALUE}`'
    }
  }
});

connectRequestSchema.index({fromUserId:1 ,toUserId: 1});

connectRequestSchema.pre("save", function(next){
  const request = this
  if(request.fromUserId.equals(request.toUserId)){
    throw new Error("Cannot send Request to your self!")
  }
  next()
})

export const ConnectionRequest: Model<connectRequestProps> = mongoose.model<connectRequestProps>("ConnectionRequest", connectRequestSchema);