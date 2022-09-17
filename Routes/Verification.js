const express=require('express');
const Sequrity = require('../Utils/Sequrity');
const router=express.Router();
const VerifyToken=require('../Utils/VerifyToken');

router.post('/',Sequrity,VerifyToken);
module.exports=router;