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
var constring = 'postgres://postgres@localhost/bfing_app';



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
    // console.log('FB Profile: ', profile);
    //db. query to check if user exists in database
    db.users.findOne({facebook_id: profile.id}, function(err, dbRes) {
      if (dbRes === undefined) {
        console.log("User not found. Creating...");
        db.users.insert({name: profile.displayName, type: 'client', facebook_id: profile.id} , function(err, dbRes) {
          return next(null, dbRes);
        });
      } else {
        console.log("Existing user found.");
        return next(null, dbRes);
      }
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: keys.googleKey,
    clientSecret: keys.googleSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, function(accessToken, refreshToken, profile, next) {
    // console.log(profile);
    db.users.findOne({google_id: profile.id}, function(err, dbRes) {
      if (dbRes === undefined) {
        console.log("User not found. Creating...");
        db.users.insert({name: profile.displayName, type: 'client', google_id: profile.id, photo: profile.photos[0].value} , function(err, dbRes) {
          return next(null, dbRes);
        });
      } else {
        console.log("Existing user found.");
        return next(null, dbRes);
      }
    });
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

app.get('/me', checkAuth, controller.getUser);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  // console.log('hit');
});

app.post('/addMessage', function (req, res) {
  var date = req.body.date_time;
  var msg = req.body.message;
  var userID = req.body.user_id;
  var roomID = req.body.room_id;
  console.log(date);
  db.messages.insert({date_time: date, message: msg, user_id: userID, room_id: roomID}, function(err, dbRes) {
    if (err) {
      res.send(err);
    } else {
      console.log('add_message endpoint hit');
      res.send(dbRes);
    }
  });
});

var waitingUsers = [
  //{user socket: socket, clientId: clientID}
];

var patientList = [];

io.on('connection', function(socket){
  console.log("Socket Conn ID: ", socket.conn.id);
  console.log('a user connected');
  socket.on('disconnect', function(){
    // socket.leave('some room');
    console.log('user disconnected');
  });

  socket.on('addUserToQ', function(clientID) {

    var clientObj = {clientID: clientID,
      socket: socket};
    waitingUsers.push(clientObj);

    console.log('waitingUsers:', waitingUsers);

    for (var i = 0; i < waitingUsers.length; i++) {
      patientList.push(waitingUsers[i].clientID);
    }

    console.log('patient list:', patientList);

    io.emit('waitingList:update', patientList);
  });

  socket.on('send:message', function(msg, userID, roomID){
    console.log('message: ' + msg, 'to room:', roomID);
    io.to(roomID).emit('sendMessageBack', msg, userID, roomID);
  });

  socket.on("next patient", function(pcID) {
    if (waitingUsers.length === 0) {
      socket.emit('empty queue');
      console.log('empty queue');
      return;
    }
    var roomID = controller.getRoomId();

    var clientSocket = waitingUsers[0].socket;
    var pcSocket = socket;

    pcSocket.join(roomID);
    clientSocket.join(roomID);

    var nextPatient = waitingUsers.shift();

    console.log(waitingUsers);

    socket.emit("joined room", roomID);

    clientSocket.emit("joined room", roomID);

    console.log('PC:', pcID, '&', 'client:', nextPatient.clientID, 'joining room', roomID);
  });
});

var port = keys.port;
http.listen(port, function(){
  console.log('listening on ' + port);
});

//ATTEMPT AT NOT LETTING USERS ADD THEMSELVES MORE THAN ONCE

// io.on('connection', function(socket) {
//     console.log("Socket Conn ID: ", socket.conn.id);
//     console.log('a user connected');
//     socket.on('disconnect', function() {
//         // socket.leave('some room');
//         console.log('user disconnected');
//     });
//
//     socket.on('addUserToQ', function(clientID) {
//
//             // controller.addUserToQ(socket, clientID);
//           var clientObj = {
//               clientID: clientID,
//               socket: socket
//           };
//           console.log('before check:', waitingUsers);
//           var alreadyAdded = false;
//
//           function checkIfExists() {
//               console.log('inside function');
//               if (waitingUsers.length === 0) {
//                 waitingUsers.push(clientObj);
//                 patientList.push(clientObj.clientID);
//                 console.log('user pushed', waitingUsers);
//               } else {
//                 for (var i = 0; i < waitingUsers.length; i++) {
//                     console.log('loop', i);
//                     if (waitingUsers[i].clientID === clientObj.clientID) {
//                         console.log('user already added');
//                         alreadyAdded = true;
//                         return alreadyAdded;
//                     }
//                 }
//                 if (!alreadyAdded) {
//                     waitingUsers.push(clientObj);
//                     patientList.push(clientObj.clientID);
//                     console.log('user pushed', waitingUsers);
//                 } else {
//                     console.log('not added because already existing');
//                 }
//               }
//
//           };
//           console.log('finished for loop');
//
//           checkIfExists();
//
//           console.log('after check:', waitingUsers);
//           console.log('waitingUsers:', waitingUsers);
//           console.log('patient list:', patientList);
//       }
//
//
//         io.emit('waitingList:update', patientList);
//     });
