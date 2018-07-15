import Authentication from '@/services/Authentication'
import User from '@/classes/User'
import Message from '@/classes/Message'

/**
 * Ein LoginForm für Benutzer authentifizierung.
 *
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
class LoginForm {
  constructor () {
    this.username = ''
    this.message = new Message()
    this.loading = false
  }

  /**
   * Versuche den Benutzer anhand des Usernamen zu authentifizieren.
   */
  async authenticate () {
    this.loading = true
    var user = null
    try {
      let result = await Authentication.authenticate({
        username: this.username
      })
      user = new User(result.data.User.id, result.data.User.username)

      this.message = new Message(true, 'notice', 'Erfolgreich angemeldet')
    } catch (error) {
      if (error.response) this.message = new Message(true, 'error', error.response.data.error)
      else this.message = new Message(true, 'error', 'Der Server ist momentan nicht erreichbar')
    }
    this.loading = false
    return user
  }

  /**
   * Placeholder um Logout events für den Log zu generieren
   *
   * @param user der angemeldete Benutzer
   */
  async deauthenticate (user) {
    this.loading = true
    await Authentication.deauthenticate({
      userId: user.id,
      username: user.username
    })
    this.loading = false
    this.message = new Message(true, 'notice', 'Erfolgreich ausgeloggt')
  }
}

export default LoginForm
