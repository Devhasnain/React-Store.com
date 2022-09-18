const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const Permission = require('../Utils/Permission');
const Sequrity = require('../Utils/Sequrity');
const router = express.Router();

router.post('/create-checkout-session',Sequrity, Permission, async (req, res) => {
  try {
    const {products}=req.body;
    const session = await stripe.checkout.sessions.create({
      line_items:products.map((item)=>{
        return{
          price_data:{
            currency:"usd",
            product_data:{
              name:item.title,
            },
            unit_amount:item.price*100
          },
          quantity:1
        }
      }),
      mode: 'payment',
      success_url: `${'http://localhost:3000/'}/order_successful'`,
      cancel_url: `${'http://localhost:3000/'}canceled=true`,
    });
    res.status(200).json(
      {
        url:session.url,
        access:true
      }
      );  
  } catch (error) {
    return res.status(500).json({
      msg:"Some error occured please tryagain",
      access:false
    })
  }
  
});
module.exports = router;