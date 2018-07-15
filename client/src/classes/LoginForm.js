import Authentication from '@/services/Authentication'
import User from '@/classes/User'

/**
 * Ein LoginForm für Benutzer authentifizierung.
 * 
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
class LoginForm {
  constructor () {
    this.username = ''
    this.message = new Message()
  }

  /**
   * Versuche den Benutzer anhand des Usernamen zu authentifizieren.
   */
  async authenticate () {
    if (this.username.length <= 0) {
      this.message = new Message(true, 'error', 'Bitte gib deinen Benutzernamen ein!')
      return null
    }

    var user = null
    try {
      let result = await Authentication.authenticate({
        username: this.username
      })
      user = new User(result.data.User.id, result.data.User.username)

      this.message = new Message(true, 'notice', 'Erfolgreich angemeldet')
    } catch (error) {
      this.message = new Message(true, 'error', error.response.data.error)
    }
    return user
  }

  /**
   * Placeholder um Logout events für den Log zu generieren
   *
   * @param user der angemeldete Benutzer
   */
  async deauthenticate (user) {
    await Authentication.deauthenticate({
      userId: user.id,
      username: user.username
    })
    this.message = new Message(true, 'notice', 'Erfolgreich ausgeloggt')
  }
}

/**
 * Message Objekt welches je nach Antwort der API generiert wird
 */
class Message {
  /**
   * 
   * @param visible Gibt an ob die Nachricht angezeigt werden soll
   * @param type Der Typ der Nachricht (error, notice)
   * @param msg Der Text der Nachricht
   */
  constructor (visible, type, msg) {
    this.visible = visible || false
    this.type = type || 'notice'
    this.msg = msg || ''
  }
}

export default LoginForm
