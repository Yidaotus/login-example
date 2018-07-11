var db = require('../db')

module.exports = {
  authenticate_user (req, res) {
    var sql = 'SELECT * FROM users WHERE username = ?'
    // Formatiere die SQL Anfrage um den Input zu säubern
    sql = db.format(sql, req.body.username)
    db.query(sql, function (error, results, fields) {
      if (error) throw error

      // Benutzer existiert
      if (results.length) {
        // @TODO Session IDs vergeben
        res.send({
          user_exists: true
        })
      } else {
        res.send({
          user_exists: false
        })
      }
    })
  }
}
