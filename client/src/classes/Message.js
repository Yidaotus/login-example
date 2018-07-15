/**
 * Message Objekt welches je nach Antwort der API generiert wird
 *
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
class Message {
  /**
   * Konstruktor für ein neues Message Objekt
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

export default Message
