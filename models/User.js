const mongoose = require('mongoose');

const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate')

const List = require('./List');


const userSchema = new mongoose.Schema({
    username: {type: String },
    email : {type : String , unique : true },
    password : {type : String  },
    motivationCount : {type : Number , default : 1},
    country : {type : String  },
    city : {type : String  },
    todos : [{type: mongoose.Schema.Types.ObjectId, ref:'List', default:[]}],
    currentList : {type: mongoose.Schema.Types.ObjectId, ref:'List'},
    googleId:{type: String}
});

// userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User' , userSchema);

module.exports =  User ;