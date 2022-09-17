require('dotenv').config();
require('./Utils/DB');
const express=require('express');
const cors=require('cors');
const app=express();
 
const Signup=require('./Routes/Signup');
const verification=require('./Routes/Verification');
const Login=require('./Routes/Login'); 
const Stripe=require('./Routes/Sripe');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello');
})
app.use('/login',Login);
app.use('/signup',Signup);
app.use('/verification',verification);
app.use('/stripe',Stripe);

app.listen(process.env.PORT || 3001);