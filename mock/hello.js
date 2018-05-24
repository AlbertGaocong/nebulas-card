

module.exports = {
  api: '/api/hello',
  response: function (req, res) {
    res.send(`
      <p>
        标签1
      </p>
      
    `);
  }
}