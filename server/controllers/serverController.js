module.exports = {
  getUser: function(req, res) {
    // console.log(req.user);
    res.send(req.user);
  }
};
