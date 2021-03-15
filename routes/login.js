const express = require('express');
const router  = express.Router();

const User = require("../models/User");
const List = require("../models/List");

const passport = require("passport");

router.route('/')
.post((req,res,next)=>{
        if(emailIsValid(req.body.username)){
            User.findOne({email:req.body.username}, (err,foundUser)=>{
                if(!err){
                    if(foundUser){
                        req.body.username = foundUser.username;
                        passport.authenticate("local",(err,user,info)=>{
                            if(err){
                                res.json({ err: "network" , msg: "Network Error"})
                            }
                            if(!user){
                                res.json({err: "pass" , msg:"Incorrect Password"});
                            }
                            else{
                                req.login(user, error=>{
                                    if(error){
                                        res.json({ err: "network" , msg: "Network Error"})
                                    }
                                    else{
                                        res.status(202).json(user);
                                    }
                                })
                            }
                        })(req,res,next)
                    }
                    else{
                        res.json({err: "user" , msg:"unregistered email address"})
                    }
                }
                else{
                    res.json({ err: "network" , msg: "Network Error"})
                }
                
            })
        }
        else{
            User.findOne({username:req.body.username}, (err,foundUser)=>{
                if(!err){
                    if(foundUser){
                        passport.authenticate("local",(err,user,info)=>{
                            if(err){
                                res.json({ err: "network" , msg: "Network Error"})
                            }
                            if(!user){
                                res.json({ err:"pass" ,msg:"Incorrect Password"});
                            }
                            else{
                                req.login(user, error=>{
                                    if(error){
                                        res.json({ err: "network" , msg: "Network Error"})
                                    }
                                    
                                    else{
                                        res.status(202).json(user);
                                    }
                                })
                            }
                        })(req,res,next)
                    }
                    else{
                        res.json({ err:"user" ,msg:"Unregistred Username"})
                    }
                }
            })
            
        }

})



///Some validation functions 
function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }



module.exports = router; 