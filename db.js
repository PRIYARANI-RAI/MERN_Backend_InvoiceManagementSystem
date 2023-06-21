
import mongoose  from "mongoose";

const config= require("./config.js")
import 'dotenv/config';

const configvalue =config.get(process.env.NODE_ENV);
const DB=configvalue["DB"]

var option = {
    user:DB.USERNAME,
    pass:DB.PASSWORD
}

const MONGOURL=`mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`
console.log(MONGOURL)
 export const mongoconnection= async ()=>{
    try{
 await mongoose.connect(MONGOURL,option)
 console.log("Database connected successfully ")
    }
    catch(e){
        console.log(e)
        throw e
    }
}     