import Customer from "../model/Customer";

export const CheckMail = async (req,res,next)=>{

    const result = await Customer.findOne({email:req.body.email});

    if(!result){
        next();
    }
    else{
        res.send({
            status:false,
            message:"Email Alredy Registered!!!!"
        })
    }
}