const User = require('./models/User');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const List = require("./models/List");


module.exports = function(passport){

    passport.use(new localStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { throw err; }
            bcrypt.compare(password, user.password, (error,result)=>{
                if(error){
                    throw err
                }
                if(result){
                    return done(null,user);
                }
                else{
                    return done(null,false);
                }
            })
          });
        }
      ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/todos",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      function(accessToken, refreshToken, profile, cb) {
        
        User.findOrCreate({ username : profile.displayName ,googleId: profile.id }, function (err, user) {
          if(!user.currentList){
            var date = (new Date().toLocaleDateString()).split('/')
            date = date[1]+'/'+date[0]+'/'+date[2]
            
            const list = new List({
                date : date
            });
            list.save()
            user.currentList = list.id
            user.save();
          }
          return cb(err, user);
        });
      }
    ));


}

