const mongoose = require ('mongoose');

const itemSchema = new mongoose.Schema({
    text : {type : String},
    done : {type : Boolean , default:false}
});

const Item = mongoose.model('Item',itemSchema);

module.exports = Item;