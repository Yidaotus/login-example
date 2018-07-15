import Api from '@/services/Api'

/**
 * Bindings für die Authentifizierungs API
 *
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
export default {
  authenticate (credentials) {
    return Api().post('authenticate', credentials)
  },
  deauthenticate (credentials) {
    return Api().post('deauthenticate', credentials)
  }
}
