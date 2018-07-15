var db = require('../db')
var logger = require('../logger')
var User = require('../models/User')

/**
 * @TODO Echtes Session handling
 *
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
module.exports = {
  /**
   * Prüft ob ein Benutzer in der Datenbank existiert. Der Benutzername
   * muss dafür im POST der Anfrage unter username übergeben werden.
   *
   * Bei Erfolgreicher überprüfung wird eine HTTP 200 Antwort gesendet
   * welche das bestehen des Benutzers anzeigt. Ist der Benutzer nicht
   * in der Datenbank vorhanden wird eine HTTP 400 Antwort gesendet.
   *
   * @param req Das request Objekt für diese Schnitstelle
   * @param res Das response Objekt für diese Schnitstelle
   */
  authenticate_user (req, res) {
    User.findByUsername(req.body.username, db, function (user) {
      if (user) {
        logger.logEvent(logger.EVENT['USER_LOGIN_SUCCESFUL'], user.id, user.username)
        res.status(200).send(user.toJSON())
      } else {
        logger.logEvent(logger.EVENT['USER_NOT_FOUND'], null, req.body.username)
        res.status(400).send({
          error: 'Login fehlgeschlagen'
        })
      }
    })
  },

  /**
   * Placeholder damit wir logout Events generieren können.
   * @ TODO userId validieren und mit User.findById() checken.
   *
   * @param req Das request Objekt für diese Schnitstelle
   * @param res Das response Objekt für diese Schnitstelle
   */
  deauthenticate_user (req, res) {
    logger.logEvent(logger.EVENT['USER_LOGOUT'], req.body.userId, req.body.username)
    res.status(200).send({
    })
  }
}
