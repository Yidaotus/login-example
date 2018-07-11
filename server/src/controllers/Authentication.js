var db = require('../db')
var Logger = require('../logger')

module.exports = {
/**
 * Prüft ob ein Benutzer in der Datenbank existiert. Der Benutzername
 * muss dafür im POST der Anfrage unter username übergeben werden.
 *
 * Bei Erfolgreicher überprüfung wird eine HTTP 200 Antwort gesendet
 * welche das bestehen des Benutzers anzeigt. Ist der Benutzer nicht
 * in der Datenbank vorhanden wird eine HTTP 400 Antwort gesendet.
 * @param req Das request Objekt für diese Schnitstelle
 * @param res Das response Objekt für diese Schnitstelle
 */
  authenticate_user (req, res) {
    var logger = new Logger()
    var sql = 'SELECT userId FROM users WHERE username = ?'
    // Formatiere die SQL Anfrage um den Input zu säubern
    sql = db.format(sql, req.body.username)
    db.query(sql, function (error, results, fields) {
      if (error) throw error

      // Benutzer existiert
      if (results.length) {
        // @TODO Session IDs vergeben
        logger.logEvent(logger.EVENT['USER_LOGIN_SUCCESFUL'], results[0].userId, req.body.username)
        res.status(200).send({
          user_exists: true,
          id: results[0].userId
        })
      } else {
        logger.logEvent(logger.EVENT['USER_NOT_FOUND'], null, req.body.username)
        res.status(404).send({
          user_exists: false,
          error: 'This user does not exist'
        })
      }
    })
  }
}
