const mongoose = require ('mongoose');

const Item = require('./Item');

const listSchema = new mongoose.Schema({
    // list : {type : [Item.schema], ref:'Item'} ,
    list : [{ type : [String]  }] ,
    date:  {type: String},
});

const List = mongoose.model('List',listSchema);

module.exports = List