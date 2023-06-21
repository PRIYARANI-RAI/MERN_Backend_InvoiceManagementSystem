import mongoose from "mongoose";

const AdminSchema= new mongoose.Schema({

    email:{
        type:String,
        require:false
    },
    password:{
        type:String,
        require:true
    }

})
const Admin = mongoose.model("admins",AdminSchema);
export default Admin;