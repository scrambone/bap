var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');




var AuctionSchema = mongoose.Schema({
    id:{
        type : Number,
        index : true
    },
    auctionid:{
        type: Number
    },
    name: {
        type : String
    },
    age: {
        type : Number
    },
    description: {
        type: String
    },
    picture: {
        type: String
    },
    starts: {
        type: String
    },
    category: {
        type: String
    },
    duration: {
        type: String
    }
});

var Auction = module.exports = mongoose.model('Auction', AuctionSchema);

module.exports.createAuction = function(newAuction, callback){
    
        newAuction.save(callback);
    };


/*module.exports.getAuctionByName = function(username, callback){
    var query = {username: username};
    Auction.findOne(query, callback);
}*/


module.exports.getAuctionById = function(id, callback){
    
    Auction.findById(id, callback);
}


/*module.exports.getNextSequence = function(name){
    
var query = {username: username};
    User.findOne(query, callback);



  var ret = db.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );

   return ret.seq;
}*/
