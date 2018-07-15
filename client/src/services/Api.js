import axios from 'axios'

/**
 * Basis all unserer APIs
 *
 * @author Daniel Voigt <D.Voigt1993@gmail.com>
 */
export default() => {
  return axios.create({
    baseURL: 'http://localhost:8081/'
  })
}
