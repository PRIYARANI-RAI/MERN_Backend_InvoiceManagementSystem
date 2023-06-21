import mongoose from "mongoose";
import  paginate  from "mongoose-paginate-v2";

const CustomerSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }

})
CustomerSchema.plugin(paginate);
const Customer = mongoose.model("Customer",CustomerSchema);
export default Customer;