const UserSchema=require('../Models/Users');
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const VerifyToken=(req,res,next)=>{
    const {token}=req.body;
    try {
        JWT.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if (!user) {
                return res.status(401).json({
                    msg:"User not identified!",
                    access:false
                })
            } else {
                UserSchema.findById(user.id)
                .then(result=>{
                    if (result===null||undefined) {
                        return res.status(400).json({
                            msg:"Some error occured please tryagain!",
                            access:false
                        })
                    } else {
                        return res.status(200).json({
                            msg:"Verification Successful",
                            access:true,
                            id:result._id,
                            name:result.name,
                            email:result.email,
                            number:result.number,
                            products:result.products
                        });
                        
                    }
                })
                .catch(error=>{
                    return res.status(500).json({
                        msg:"Some error occured please tryagain!",
                        access:false
                    })
                })
            }
        })
    } catch (error) {
        return res.status(401).json({
            msg:"Some error occured tryagian",
            access:false
        })
    }
};
module.exports=VerifyToken;