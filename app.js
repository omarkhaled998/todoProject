require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require("cookie-parser");
const path = require('path');

//authentication
const session = require("express-session");
const passport = require("passport");

///importing models
const User = require('./models/User');
const List = require("./models/List");
const Item = require("./models/Item");

///importing routes
const user = require('./routes/user');
const list = require('./routes/list');
const item = require('./routes/item');
const register = require("./routes/register");
const login = require("./routes/login");
const google = require("./routes/google");
const facebook = require("./routes/facebook")

const PORT = process.env.PORT || 5000;

//setting the app
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(express.static("public"));

app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
app.use(cors());
app.use(cookieParser());

///mongoose connection

mongoose.connect(process.env.MONGODB_URI ||process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true } ,(err)=>{
    if(!err){
        console.log("Connected to DB");
    }
    else{
        console.log(err);
    }
})
mongoose.set('useFindAndModify', false);


if(process.env.NODE_ENV ==='production'){
    app.use(express.static(path.join(__dirname, './client/build')));

    // PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
    app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
    });
    app.get('/todo', function (req, res) {
        res.sendFile(path.join(__dirname, './client/build', 'index.html'));
        });
    app.get('/login', function (req, res) {
        res.sendFile(path.join(__dirname, './client/build', 'index.html'));
        });
}




//setting routes
app.use('/user',user);
app.use('/list',list);
app.use('/item',item);
app.use('/register',register);
app.use('/login',login);
app.use('/google',google)
app.use('/facebook',facebook)







// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/todos', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.get('/logout',(req,res)=>{
    req.logout();
});



app.listen(PORT,()=>{
    console.log("Backend running on port 5000");
})






//   if(emailIsValid(req.body.username)){
//     User.findOne({email:req.body.username},(err,foundUser)=>{
        
//         if(err){
//             res.send(err);
//         }
//         else{
            
//             const user = new User({
//                 username: foundUser.username,
//                 password:req.body.password
//             });
//             console.log(user);
//             req.login(user, (err)=>{
//                 if(err){
//                     res.send(err);
//                 }
//                 else{
//                     passport.authenticate("local")(req,res,()=>{
//                         res.send("User Authenticated");
//                     });
//                 }
//             })
//         }
//     })
// }