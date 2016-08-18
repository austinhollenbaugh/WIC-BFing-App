var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google').Strategy;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var keys = require('./keys');
var controller = require('./controllers/serverController.js');
var constring = 'postgres://austinhollenbaugh@localhost/practice';


var app = module.exports = express();
var massiveInstance = massive.connectSync({
  connectionString: constring
});

app.set('db', massiveInstance);
var db = app.get('db');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));

app.use(session({
  secret: 'make up your own session secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: keys.facebookKey,
    clientSecret: keys.facebookSecret,
    callbackURL: "/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, next) {
    console.log('FB Profile: ', profile);
    return next(null, profile);
  }
));

passport.serializeUser(function(profile, done) {
  done(null, profile);
});

passport.deserializeUser(function(deserializedUser, done) {
  done(null, deserializedUser);
});

// passport.use(new GoogleStrategy({
//     clientID: '',
//     clientSecret: '',
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   }, function(accessToken, refreshToken, profile, next) {
//     return next(null, profile);
//   }
// ));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

var checkAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.json({err: 403});
  }
};



app.get('/me', checkAuth, controller.getUser);

// app.get('/sign-in', function (req, res) {
//   res.redirect('/#/sign-in');
// });

// app.get('/')

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
//
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

app.listen(3000, function(){
  console.log('listening on *:3000');
});
