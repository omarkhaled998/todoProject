var express = require('express');
const router  = express.Router();
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID)

const User = require('../models/User')
const List = require('../models/List')


router.route('/signup')
.post((req,res)=>{
  const {tokenId} = req.body;
  client.verifyIdToken({idToken : tokenId, audience: process.env.CLIENT_ID})
  .then(response => {
     const {email_verified,name,email} = response.payload 
     if(email_verified){
       User.findOne({email:email},(err,user)=>{
         if(err){
           return res.json({err:"unknown" ,msg:"something went wrong."})
         }
         else{
          if(user){
            return res.json({err:"user" ,msg:"Email already registered"})
           }

           else{
            var date = (new Date().toLocaleDateString()).split('/')
            date = date[1]+'/'+date[0]+'/'+date[2]
            
            const list = new List({
                date : date
            });
            list.save();
            const user =new User({
              username: name,
              email:email,
              currentList : list._id,
              todo:[],
            })
            user.save((err)=>{
              if(!err){
                res.status(202).json(user)}
              else{
                res.json({err:"unknown" ,msg:"something went wrong."})
              }
              })
              
           }
         }

       })
     }
  })

})


router.route('/signin')
.post((req,res)=>{
  const {tokenId} = req.body;
  client.verifyIdToken({idToken : tokenId, audience: process.env.CLIENT_ID})
  .then(response => {
     const {email_verified,name,email} = response.payload 
     if(email_verified){
       User.findOne({email:email},(err,user)=>{
         if(err){
           return res.json({err:"unknown" ,msg:"something went wrong."})
         }
         else{
          if(user){
            return res.status(202).json(user)
           }
           else{
            return res.json({err:"user" ,msg:"No registered user with this mail"})
           }

         }

       })
     }
  })

})

module.exports = router; 