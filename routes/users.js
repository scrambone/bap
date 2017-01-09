var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Auction = require('../models/auction');
var Counter = require('../models/counter');


//Register
router.get('/register', function(req, res) {
	res.render('register');
});

//Create Lot
router.get('/createlot', function(req, res) {
    res.render('createlot');
});

//Login
router.get('/login', function(req, res) {
	res.render('login');
});

//MyInfo
/*router.get('/myinfo', function (req, res) {
    res.render('myinfo');
    //req.flash('success_msg',' befoUser');
  
     User.getUserByUsername("scrambone", function(err, user){
     if(err) throw err;
     if(!user){
         return done(null, false, {message: 'Unknow User'});
     }
   
     req.flash('success_msg',' got User with name: '+user.name);
 });
   
});*/


/*router.get('/myinfo/:id', function(req, res){
User.getUserByUsername(req.params.id, function(err, user){
     if(err) throw err;
     if(!user){
         return done(null, false, {message: 'Unknow User'});
     }
   
     //req.flash('success_msg',' got User with name: '+user.name);
     res.send('user name= ' +user.name);
 });

 // res.send('user name= ' +user.name);
});*/



//Register User
router.post('/register', function(req, res) {
	var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();
    
    if (errors){
        res.render('register',{
            errors:errors
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg','You are registered and can now login');
        res.redirect('/users/login');
    }
});






//Create Lot
router.post('/createlot', function(req, res) {
    //console.log(req.body);
   // var auctionid=0;
    var name = req.body.name;
    var age = req.body.age;
    var description = req.body.description;
    var picture = req.body.picture;
    var starts = req.body.starts;
    var category = req.body.category;
    var duration = req.body.duration;
    var auctionid=Counter.getNextSequence("auctionid");
    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('age', 'Age is required').notEmpty();
    req.checkBody('age', 'Age must be 18+').len(2);
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('picture', 'Picture is required').notEmpty();
    req.checkBody('starts', 'Date of start is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();
    req.checkBody('duration', 'Duration is required').notEmpty();
    
   
    
    var errors = req.validationErrors();
    
    if (errors){
        res.render('createlot',{
            errors:errors
        });
    } else {
     
       
       // console.log("here2 = "+Counter.getNextSequence("auctionid"));
       //auctionid=Counter.getNextSequence("auctionid");
       // console.log("here3 = "+auctionid);
        var newAuction = new Auction({
            
            auctionid: auctionid,
            //auctionid: Counter.getNextSequence("auctionid"),
            name: name,
            age: age,
            description: description,
            picture: picture,
            starts: starts,
            category: category,
            duration: duration
            
        });
        Auction.createAuction(newAuction, function(err, auction){
            if(err) throw err;
            console.log(auction);
        });
        req.flash('success_msg','Your Auction was successfully created!');
        res.redirect('/');
    }
});





passport.use(new LocalStrategy(
  function(username, password, done) {
 User.getUserByUsername(username, function(err, user){
     if(err) throw err;
     if(!user){
         return done(null, false, {message: 'Unknow User'});
     }
     User.comparePassword(password, user.password, function(err, isMatch){
         if(err) throw err;
         if(isMatch){
             return done(null, user);
             
         } else {
            return done(null, false, {message: 'Invalid password'}); 
         }
         
     })
 });
      
  }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



router.post('/login',
  passport.authenticate('local', {successRedirect: '/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
   // res.redirect('/users/' + req.user.username);
    
    res.redirect('/');
  });

router.get('/logout',function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});



module.exports = router;
