module.exports = function(socket) {
  var name = userNames.getGuestName();

  socket.emit('init', {
    name: name,
    users: userNames.get()
  });

  socket.broadcast.emit('user:join', {
    name: name
  });

  socket.broadcast.emit('user:join', {
    name: name
  });

  socket.on('send:message', function(data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
};
