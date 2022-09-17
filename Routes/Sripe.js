const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const Permission = require('../Utils/Permission');
const Sequrity = require('../Utils/Sequrity');
const router = express.Router();

router.post('/create-checkout-session',Sequrity, Permission, async (req, res) => {
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
    success_url: `${'http://localhost:3000/'}?success=true`,
    cancel_url: `${'http://localhost:3000/'}?canceled=true`,
  });
  res.send(session.url);
});
module.exports = router;