var express = require('express');
const router  = express.Router();
const fetch = require('node-fetch');


const User = require('../models/User')
const List = require('../models/List')


router.route('/signup')
.post((req,res)=>{
  const {accessToken,userID} = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  fetch(urlGraphFacebook, {
      method : 'GET'
  })
  .then(res=>res.json())
  .then(result => {
       const {email,name} = result;
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
               return res.status(202).json(user)}
             else{
              return res.json({err:"unknown" ,msg:"something went wrong."})
             }
             })
             
          }
        }

      })
  })
})


router.route('/signin')
.post((req,res)=>{
  const {accessToken,userID} = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  fetch(urlGraphFacebook, {
      method : 'GET'
  })
  .then(res=>res.json())
  .then(result => {
       const {email,name} = result;
       User.findOne({email:email},(err,user)=>{
        if(err){
          return res.json({err:"unknown" ,msg:"something went wrong."})
        }
        else{
         if(user){
          return res.status(202).json(user)
          }
          else{
            return res.json({err:"user" ,msg:"User not registered"})
          }
        }
      })
  })
})



module.exports = router; 