const db = require('./db')
const config = require('config')

/**
 * Logger Klasse um Events zu speichern und in der Konsole auszugeben.
 * Geschrieben im Factory Function style.
 *
 * @param dbTable in welcher Tabelle die Events gespeichert werden sollen.
 * 
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
function Logger (dbTable) {
  this.EVENT = {
    'USER_LOGIN_SUCCESFUL': 1,
    'USER_NOT_FOUND': 2,
    'USERNAME_NOT_VALID': 3,
    'USER_LOGOUT': 4
  }
  this.dbTable = dbTable || config.get('Database.logs.table')
}

/**
 * Loggt das Event in der Konsole so wie in der Datenbank.
 *
 * @param eventId Welches Event ausgelöst wurde siehe Logger::EVENT
 * @param userId die ID des Benutzers der das Event ausgelöst hat falls vorhanden
 * @param userName der Name des Benutzers der das Event ausgelst hat falls vorhanden
 */
Logger.prototype.logEvent = function (eventId, userId, userName) {
  if (eventId && eventId > 0) {
    var date = new Date()
    switch (eventId) {
      case this.EVENT['USER_LOGIN_SUCCESFUL']:
        console.log(`${date}: User ${userName} hat sich erfolgreich eingeloggt`)
        break
      case this.EVENT['USER_NOT_FOUND']:
        console.log(`${date}: User ${userName} wurde nicht gefunden`)
        break
      case this.EVENT['USERNAME_NOT_VALID']:
        console.log(`${date}: Username ${userName} entspricht nicht dem richtigen Format`)
        break
      case this.EVENT['USER_LOGOUT']:
        console.log(`${date}: User ${userName} hat sich ausgeloggt`)
        break
    }
    var sql = 'INSERT INTO ?? (`eventId`, `userId`) VALUES (?, ?)'
    db.query(sql, [this.dbTable, eventId, userId], function (error, results, fields) {
      if (error) {
        throw (error)
      }
    })
  } else {
    throw new Error('Unknown event type')
  }
}

module.exports = Logger
