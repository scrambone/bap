var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');




var CounterSchema = mongoose.Schema({
    _id: {
        type : String,
        index : true
    },
    seq: {
        type : Number
    }
});

var Counter = module.exports = mongoose.model('Counter',CounterSchema);




/*module.exports.getNextSequence = function(name){
    
var query = {_id: name},
            update: { $inc: { seq: 1 } },
            new: true;
    Counter.findAndModify(query, callback);
   return ret.seq;
}*/



newid = 0;
 
   
module.exports.getNextSequence = function(name){
Counter.findOneAndUpdate( {_id: name}, {$inc:{seq:1}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
newid = doc.seq+1;
  /*  console.log("New newid = "+newid);
    console.log("doc = "+doc);
    console.log("type_inside = "+typeof(doc.seq));*/
   
   // return (newid);
  // return(doc.seq);
  
});
return (newid);

}