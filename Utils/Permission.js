const UserSchema=require('../Models/Users');
const JWT=require('jsonwebtoken');
const Permission=(req,res,next)=>{
    const {token}=req.body;
    try {
        JWT.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if (!user) {
                return res.status(400).json({
                    msg:"user not identified!",
                    access:false
                })
            } else {
                UserSchema.findById(user.id)
                .then(result=>{
                    if (result===null||undefined) {
                        return res.status(400).json({
                            msg:"Some error occured tryagain!",
                            access:false
                        })
                    } else {
                        next();
                    }
                })
                .catch(error=>{
                    return res.status(500).json({
                        msg:"Some error occured tryagain!",
                        access:false
                    })
                })
            };
        });
    } catch (error) {
        return res.status(500).json({
            msg:"some error occured please tryagain!",
            access:false
        });
    };
};
module.exports=Permission;