
module.exports = {
  api: '/api/time',
  response: function (req, res) {
    res.send({"time":"24","name":"gao"});
  }
}