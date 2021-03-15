const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.route('/')
.get((req,res)=>{
    Item.find((err,foundItems)=>{
        if(!err){
            res.send(foundItems)
        }
        else{
            res.send(err);
        }
    })
})
.post((req,res)=>{
    const item = new Item({
        text : req.body.text,
    }) 
    item.save(err=>{
        if(!err){
            res.send("Item saved successfully")
        }
        else{
            res.send(err)
        }
    })
})
.delete((req,res)=>{
    Item.deleteMany((err)=>{
        if(!err){
            res.send("Items deleted successfully")
        }
        else{
            res.send(err)
        }
    })
})


router.route('/:itemId')
.get((req,res)=>{
    const itemID = req.params.itemId;
    Item.findById(itemID,(err,foundItems)=>{
        if(!err){
            res.send(foundItems)
        }
        else{
            res.send(err);
        }
    })
})
.delete((req,res)=>{
    const itemID = req.params.itemId;
    Item.findByIdAndDelete(itemID,(err)=>{
        if(!err){
            res.send("Item deleted successfully")
        }
        else{
            res.send(err)
        }
    }) 
}) 
.patch((req,res)=>{
    Item.updateOne({_id : req.params.itemId}, {$set : req.body} , (err)=>{
        if(!err){
            res.send("Item Updated Successfully");
        }
        else{
            res.send(err);
        }
    });
});


module.exports = router; 
