const db = require('./db')
const config = require('config')

function Logger (dbTable) {
  this.EVENT = {
    'USER_LOGIN_SUCCESFUL': 1,
    'USER_NOT_FOUND': 2,
    'USERNAME_NOT_VALID': 3
  }
  this.dbTable = dbTable || config.get('Database.logs.table')
}

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
    }
    var sql = 'INSERT INTO ?? (`eventId`, `userId`) VALUES (?, ?);'
    db.query(sql, [this.dbTable, eventId, userId], function (error, results, fields) {
      if (error) {
        console.log('db error')
        throw (error)
      }
    })
  } else {
    throw new Error('Unknown event type')
  }
}

module.exports = Logger
