module.exports = {
  getUser: function(req, res) {
    console.log('hit');
    res.send(req.user);
  }
};
