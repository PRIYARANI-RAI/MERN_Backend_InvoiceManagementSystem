import admins from "../model/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const adminSignup = async (req, res) => {
   
//     const adminsigndata = new admins({
       
//         email:req.body.email,
//         password:bcrypt.hashSync(req.body.password,8)

//    }
//     )
//     const adminsignnew= await adminsigndata.save()
//    res.send({ status:200 ,message:"successfully from adminSignUpPost",result:adminsignnew})
// };

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await admins.findOne({ email });
  if (!result) {
    res.send({
      status: false,
      message: "Email is Incorrect!!!",
    });
  }
else{
  const isValid = (password, result.password);

  if (isValid) {
    let payload = {};
    payload._id = result._id;

    jwt.sign(
      payload,
      "SECRET_KEY",
      {
        expiresIn: "24h",
      },
      (err, token) => {
        res.send({
          Token: token,
          status: true,
          statusCode: 200,
          message: "Success Login",
          result: result,
        });
      }
    );
  } else {
    res.send({ status: false, message: "Password is incorrect" });
  }
}
};

export const getUserbyid = async (req, res) => {
  try {
    const id = req.user.id;
    const userData = await admins.findById(id)
    res.send({ "status": 200, "message": "Success", result: userData })
  }
  catch (e) {
    throw e
  }
}
