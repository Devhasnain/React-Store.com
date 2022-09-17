const express=require('express');
const router=express.Router();
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const UsersSchema=require('../Models/Users');
const { default: mongoose } = require('mongoose');
const Sequrity = require('../Utils/Sequrity');
router.post('/',Sequrity,(req,res)=>{
    const {name,email,password,number,products}=req.body;
    try {
        UsersSchema.find({email:req.body.email})
        .then((result)=>{
            if (result.length>0) {
                return res.status(400).json({
                    msg:'User already exists with this email!',
                    access:false
                })
            } else {
                bcrypt.hash(password,10,(err,hash)=>{
                if (!hash) {
                    return res.status(500).json({
                        msg:"some error occurd please tryagain!",
                        access:false
                    })
                } else {
                    const newUser=new UsersSchema({
                        id:mongoose.Types.ObjectId,
                        name:name,
                        email:email,
                        number:number,
                        password:hash,
                        products:products
                    });
                    newUser.save()
                    .then(result=>{
                        let token=JWT.sign({id:result._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
                        return res.status(200).json({
                            msg:'Signup successful',
                            access:true,
                            token
                        })
                    })
                    .catch(error=>{
                        return res.status(500).json({
                            msg:'Some error occured tryagain!',
                            access:false
                        })
                    })
                }    
                })
            };
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Some error occured please tryagain",
            access:false
        });
    };
});
module.exports=router;