module.exports = {
  getUser: function(req, res) {
    console.log('hit');
    res.send(req.user);
  },
  getRoomId: function() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
        random;

    try {
        random = Xorshift;
    } catch (err) {
        random = Math.random;
    }

    // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
    // by minimizing calls to random()
    function Math_uuid() {
      var _chars = CHARS, _random = random,
          i = 0, uuid = new Array(36), rnd = 0;

      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      for (; i < 36; ++i) {
        if (i !== 8 && i !== 13 && i !== 18 && i !== 14 && i !== 23) {
          if (rnd <= 0x02) {
              rnd = 0x2000000 + (_random() * 0x1000000) | 0;
          }
          rnd >>= 4;
          uuid[i] = _chars[(i === 19) ? ((rnd & 0xf) & 0x3) | 0x8 : rnd & 0xf];
        }
      }
      return uuid.join('');
    }
    Math.uuid = Math_uuid;
    return Math.uuid();
    }
};

// joinChat: function(clientID) {
//   waitingUsers.push({clientID: socket.conn.id});
// },
// addUserToQ: function(socket, clientID) {
//   var clientObj = {clientID: clientID,
//     socket: socket};
//
//   function checkIfExists () {
//     for (var i = 0; i < waitingUsers.length; i++) {
//       if (waitingUsers[i].clientID === clientObj.clientID) {
//         console.log('user already added');
//         return;
//       }
//     }
//   }
//
//   waitingUsers.push(clientObj);
//   patientList.push(clientObj.clientID);
//
//   console.log('waitingUsers:', waitingUsers);
//   console.log('patient list:', patientList);
// },
