var express = require('express');
const router  = express.Router();

const User = require('../models/User');
const List = require('../models/List');
const Item = require('../models/Item');

router.route('/')
.get((req,res)=>{
    User.find((err,foundUsers)=>{
        if(!err){
            res.send(foundUsers);
        }
        else{
            res.send(err);
        }
    })
})
///// A new user will have a new list as a current list and empty saved todos.
.post((req,res)=>{
    var date = (new Date().toLocaleDateString()).split('/')
    date = date[1]+'/'+date[0]+'/'+date[2]
    
    const list = new List({
        date : date
    });
    list.save();
    const user = new User({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password,
        country : req.body.country , 
        city : req.body.city ,
        todos : [] , 
        currentList : list._id,
        motivationCount : req.body.motivationCount
    });
    user.save((err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    })

})
.delete((req,res)=>{
    User.deleteMany((err)=>{
        if(!err){
            res.send("all users deleted");
        }
    })
})




router.route('/:userId')
.get((req,res)=>{
    const userID = req.params.userId;
    User.findOne({"_id":userID})
    .populate({ 
        path: 'todos',
        // populate: {
        //   path: 'list',
        //   model: 'Item'
        // } 
     })
     .populate({ 
        path: 'currentList',
        // populate: {
        //   path: 'list',
        //   model: 'Item'
        // } 
     })
     .exec((err,user)=>{
        if(!err){
            if(user){
                res.json(user);
            }
            else{
                res.send("No user found")
            }
        }
        else{
            res.send(err)
        }
    })
    
})

///AS a signed in user i can add the current list to the saved todos
.post((req,res)=>{
    User.findById(req.params.userId,(err,foundUser)=>{
        if(!err){
            if(foundUser){
                foundUser.todos.push(foundUser.currentList);
                foundUser.save();
                res.send('List Added to the saved todos');
            }
        }
        else{
            res.send(err);
        }
    })    
})
///// As a signed in user i can add remove the current todo from the todos
.delete((req,res)=>{
    User.findById(req.params.userId,(err,foundUser)=>{
        if(!err){
            if(foundUser){
                foundUser.todos.remove(foundUser.currentList);
                foundUser.save();
                res.send('List removed from saved todos');
            }
        }
        else{
            res.send(err);
        }
    }) 
})
/// A signed in user gets his motivational count updated every time he visits the page
.patch((req,res)=>{
    User.findByIdAndUpdate(req.params.userId,{$set : req.body},(err)=>{
        if(!err){
            res.send("User updated successfully")
        }
        else{
            res.send(err);
        }
    })
})

///As a signed in user i can add a new list as the current list
router.route('/:userId/add')
.patch((req,res)=>{
    var date = (new Date().toLocaleDateString()).split('/')
    date = date[1]+'/'+date[0]+'/'+date[2]

    const list = new List({
        date : date
    });
    list.save();
    User.findByIdAndUpdate(req.params.userId,{$set : {currentList : list._id}},(err)=>{
        if(!err){
            res.json(list)
        }
        else{
            res.send(err);
        }
    })
})


router.route('/:userId/:listId')
//// A user can remove a list from the saved todos.
.delete((req,res)=>{
    User.updateOne({_id:req.params.userId},{$pull : {todos :  req.params.listId}}, (err)=>{
        if(!err){
            res.send("Updated Successfully");
        }
        else{
            res.send(err);
        }
    })
})


router.route('/:userId/todos')
.get((req,res)=>{
    const userID = req.params.userId;
    User.findOne({"_id":userID})
    .populate({ 
        path: 'todos',
     })
     .exec((err,user)=>{
        if(!err){
            if(user){
                res.json(user.todos);
            }
            else{
                res.send("No user found")
            }
        }
        else{
            res.send(err)
        }
    })
    
})





module.exports = router; 
