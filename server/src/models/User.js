/**
 * Model unserer User.
 * Geschrieben im ES6 Class style
 *
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
class User {
  /**
   * Konstruktor für ein User Objekt
   *
   * @param id Id des Benuters
   * @param username Benutername
   */
  constructor (id, username) {
    this._id = id
    this._username = username
  }

  /**
   * Gibt die ID des Benutzers wieder
   */
  get id () {
    return this._id
  }

  /**
   * Setzt die ID des Benutzers
   */
  set id (id) {
    this._id = id
  }

  /**
   * Gibt den Benutzernamen des Benutzers wieder
   */
  get username () {
    return this._username
  }

  /**
   * Setzt den Benutzernamen des Benutzers
   */
  set username (username) {
    this._username = username
  }

  /**
   * Gibt das Objekt als Json Model zurück
   */
  toJSON () {
    return {
      'User':
        {
          'id': this._id,
          'username': this._username
        }
    }
  }

  /**
   * Suche die Datenbank nach einem Benutzer mit Benutzernamen. Ruft
   * callback auf mit dem Benutzer als Argument oder Null falls der
   * Benutzer nicht gefunden wurde.
   *
   * @param username Der Benutername nach dem gesucht werden soll
   * @param db Die Datenbank welche für die Suche benutzt werden soll
   * @param callback Callback welche den Benutzer zurückgibt falls vorhanden
   */
  static findByUsername (username, db, callback) {
    var sql = 'SELECT * FROM users WHERE username = ?'

    // Formatiere die SQL Anfrage um den Input zu säubern
    sql = db.format(sql, username)
    db.query(sql, function (error, results, fields) {
      var user = null
      if (error) {
        console.log(error)
        callback(user)
      }

      // Benutzer existiert
      if (results.length) {
        user = new User(results[0].userId, results[0].username)
      }

      callback(user)
    })
  }
}

module.exports = User
