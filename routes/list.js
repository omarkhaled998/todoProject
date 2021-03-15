const express = require('express');
const router  = express.Router();

const List = require('../models/List');
const Item = require('../models/Item');

router.route('/')
.get((req,res)=>{
    List.find((err,foundLists)=>{
        if(!err){
            res.send(foundLists);
        }
        else{
            res.send(err);
        }
    })
})
.post((req,res)=>{
    var date = (new Date().toLocaleDateString()).split('/')
    date = date[1]+'/'+date[0]+'/'+date[2]

    const list = new List({
        date : date
    })
    list.save(err=>{
        if(!err){
            res.send("List added");
        }
        else{
            res.send(err);
        }
    })
})
.delete((req,res)=>{
    List.deleteMany((err)=>{
        if(!err){
            res.send("All Lists deleted")
        }
        else{
            res.send(err);
        }
    })
})

router.route('/:listId')
.get((req,res)=>{
    List.findById(req.params.listId,(err,foundList)=>{
        if(!err){
            res.send(foundList);
        }
        else{
            res.send(err);
        }
    })
})
.post((req,res)=>{
    List.findByIdAndUpdate(req.params.listId, {"$push" : {"list" : req.body.text}},(err)=>{
        if(!err){
            res.send("Item added to the list");
        }
        else{
            res.send(err);
        }
    })
})


/// you can delete an item from the a specific list
router.route('/:listId/item')
.delete((req,res)=>{
    List.findByIdAndUpdate(req.params.listId,{"$pull" : {"list" : req.body.text}},(err)=>{
        if(!err){
            res.send("Deleted");
        }
        else{
            res.send(err);
        }
    })
})
.patch((req,res)=>{
    List.findById(req.params.listId,(err,foundList)=>{
        if(!err){
            if(foundList){
                const list = foundList.list.map((item)=>{
                    if(item===req.body.text){
                        if(req.body.text.includes("  ✔")){
                            return item = item.replace("  ✔","")
                        }
                        else{
                            return item = item +"  ✔"
                        }
                    }
                    else{
                        return item
                    }
                })
                foundList.list = list
                foundList.save();

                res.send("Done");
            } 
        }
        else{
            res.send(err);
        }
    })
})

// /// you can delete an item from the a specific list
// router.route('/:listId/:itemId')
// .delete((req,res)=>{
//     List.findById(req.params.listId,(err,foundList)=>{
//         if(!err){
//             if(foundList){
//                 const list = foundList.list.filter((item,index)=>{index!==req.params.itemId})
//                 foundList.list = list;
//                 foundList.save();
//                 res.send("Deleted");
//             } 
//         }
//         else{
//             res.send(err);
//         }
//     })
// })


// .patch((req,res)=>{
//     List.findById(req.params.listId,(err,foundList)=>{
//         if(!err){
//             foundList.list.push(item);
//             foundList.save();
//             res.send("added")
//         }
//         else{
//             res.send(err);
//         }
//     })
// })




module.exports = router; 