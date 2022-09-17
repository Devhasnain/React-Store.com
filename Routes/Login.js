const express=require('express');
const router=express.Router();
const UserSchema=require('../Models/Users');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
const Sequrity=require('../Utils/Sequrity');

router.post('/',Sequrity,(req,res)=>{
    const {email,password}=req.body;
    try {
        UserSchema.find({email:email})
        .then(result=>{
            if (result.length<1) {
                return res.status(401).json({
                    msg:"User not verified please tryagain with correct credentials!",
                    access:false
                })
            } else {
                bcrypt.compare(password,result[0].password,(err,user)=>{
                    if (!user) {
                        return res.status(401).json({
                            msg:"User not verified please tryagain!",
                            access:false
                        })
                    } else {
                        const token=JWT.sign({id:result[0]._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
                        return res.status(200).json({
                            msg:"Succesful",
                            access:true,
                            token
                        })
                    }
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Some error occured please tryagain!",
            access:false
        })
    }
});

module.exports=router;