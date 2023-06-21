
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
  customer_id:{
    type:mongoose.ObjectId
  },
  customername: {
    type: String,

  },
  email: {
    type: String,
 
  },
  date: {
    type: String,
    
  },
  status: {
    type: String,
  
  },
  grandtotal:{
    type: Number
    
  },
  invoice_url:{
    type:String
  },

  item:[]
  
});

userSchema.plugin(paginate);
const userdata = mongoose.model("invoice", userSchema);

export default userdata;
