var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var app = module.exports = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var keys = require('./keys');
var controller = require('./controllers/serverController.js');
require('./controllers/socketsController.js');
var constring = 'postgres://austinhollenbaugh@localhost/practice';



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

passport.use(new GoogleStrategy({
    clientID: keys.googleKey,
    clientSecret: keys.googleSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, function(accessToken, refreshToken, profile, next) {
      console.log('Google Profile: ', profile);
      return next(null, profile);
  }
));

passport.serializeUser(function(profile, done) {
  console.log('ser');
  done(null, profile);
});

passport.deserializeUser(function(deserializedUser, done) {
  console.log('des');
  done(null, deserializedUser);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.get('/auth/google', passport.authenticate('google',{scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']}));
// app.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));


app.get('/auth/google/callback',
    passport.authenticate( 'google', {
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

app.get('/test', function(req, res, next) {
  console.log('its redirecting');
  next();
});

app.get('/me', checkAuth, controller.getUser);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// app.get('/sign-in', function (req, res) {
//   res.redirect('/#/sign-in');
// });

// app.get('/')

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  console.log('hit')
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.join('some room');
  socket.on('disconnect', function(){
    socket.leave('some room');
    console.log('user disconnected');
  });

  socket.on('send:message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.to('some room').emit('grand slam', msg);
    console.log('room joined');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
