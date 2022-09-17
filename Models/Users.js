const mongoose=require('mongoose');
const Users=mongoose.Schema({
    name:String,
    email:String,
    number:String,
    password:String,
    products:Array
});
module.exports=mongoose.model('Users',Users);