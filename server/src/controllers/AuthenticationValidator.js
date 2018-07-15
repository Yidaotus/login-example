const Joi = require('joi')
var logger = require('../logger')

/**
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
module.exports = {
  /**
   * Prüft ob der übertragene Benutzername dem akzeptierten Format entspricht.
   * Der Benutzername darf nur Alphanumerische Symbole erhalten und muss mindestens
   * 5 und maximal 42 Zeichen lang sein.
   *
   * @param req Das request Objekt für diese Anfrage
   * @param res Das response Objekt für diese Anfrage
   * @param next Die nächste Middleware welche die Datenbank nach dem Benutzer abfragt
   */
  validate (req, res, next) {
    const schema = {
      username: Joi.string().alphanum().min(4).max(42).required()
    }
    const { error } = Joi.validate(req.body, schema)

    if (error) {
      logger.logEvent(logger.EVENT['USERNAME_NOT_VALID'], null, req.body.username)
      res.status(400).send({
        error: 'Benutzername entspricht nicht dem angegebenen Format!'
      })
    } else {
      next()
    }
  }
}
