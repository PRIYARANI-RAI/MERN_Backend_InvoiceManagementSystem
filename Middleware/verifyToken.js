
import jwt from 'jsonwebtoken'

export const verifytoken = async (req,res,next) => {
    try{
var token = req.header("Authorization")
let jwtsecretkey = "SECRET_KEY";
if(!token){
    res.send({"status":200,"message":"invalid token"})
}
const decode = jwt.verify(token,jwtsecretkey);

req.user = decode;

next();
//console.log(decode)
    }
    catch(e){
        return res.send({status:"400",message:"Failed",result:e})
    }
}