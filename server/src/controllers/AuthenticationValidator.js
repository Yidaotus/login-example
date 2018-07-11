const Joi = require('joi')

module.exports = {
  /**
   * Prüft ob der übertragene Benutzername dem akzeptierten Format entspricht.
   * Der Benutzername darf nur Alphanumerische Symbole erhalten und muss mindestens
   * 5 und maximal 42 Zeichen lang sein.
   * @param req Das request Objekt für diese Anfrage
   * @param res Das response Objekt für diese Anfrage
   * @param next Die nächste Middleware welche die Datenbank nach dem Benutzer abfragt
   */
  validate (req, res, next) {
    const schema = {
      username: Joi.string().alphanum().min(5).max(42).required()
    }
    const { error, value } = Joi.validate(req.body, schema)

    if (error) {
      console.log(value)
      res.status('404').send({
        error: 'The username is not in the right format'
      })
    } else {
      next()
    }
  }
}
