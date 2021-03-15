const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../models/User");
const List = require("../models/List");

const passport = require("passport");

router.route('/')
.post((req,res)=>{
    var date = (new Date().toLocaleDateString()).split('/')
    date = date[1]+'/'+date[0]+'/'+date[2]
    
    const list = new List({
        date : date
    });
    User.findOne({username:req.body.username},(error,foundUser)=>{
        if(!error){
            User.findOne({email: req.body.email} ,(err,foundUsername)=>{
                if(!err){
                    if(foundUsername){
                        res.json({err: "user" , msg:"A User is already registered with this mail"});
                    }
                    else{
                        if(!foundUser){
                            list.save();
                            const user = new User( {
                                username: req.body.username,
                                email:req.body.email,
                                country : req.body.country,
                                city : req.body.city,
                                currentList : list._id,
                                todo:[],
                                password : req.body.password
                            })
                            bcrypt.hash(user.password, saltRounds, function(err, hash) {
                                if(!err){
                                    user.password = hash
                                    user.save((savErr)=>{
                                        if(!savErr){
                                            User.findOne({username:user.username},(retErr,createdUser)=>{
                                                if(!retErr){
                                                    if(createdUser){
                                                        res.status(202).json(createdUser);
                                                    }
                                                    else{
                                                        res.json({err:"user" ,msg:"No user"})
                                                    }
                                                }
                                                else{
                                                    res.json({err:"user" ,msg:retErr})
                                                }
                                            })
                                            
                                        }
                                        else{
                                            res.json({err:"user" ,msg:savErr})
                                        }
                                    });
            
                                }
                                else{
                                    res.json({ err: "network" , msg: "Network Error"})
                                }
                            });
                        }
                        else{
                            res.json({err: "user" , msg:"Username is already taken try another one"});
                        }

                    }
                }
            })
        }
        else{
            res.json({ err: "network" , msg: "Network Error"})
        }
    })


});





module.exports = router; 