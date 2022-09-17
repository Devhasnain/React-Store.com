require('dotenv').config();
const bcrypt=require('bcrypt');
const Sequrity=(req,res,next)=>{
    try {
        const {entryKey}=req.body;
       bcrypt.compare(entryKey,process.env.HASH_KEY,(err,hash)=>{
        if (!hash) {
            return res.status(400).json({
                msg:"Access denied",
                access:false
            });
        } else {
            next();
        }
       })
    } catch (error) {
        return res.status(400).json({
            msg:"bad request",
            access:false
        })
    }
};
module.exports=Sequrity;