import Api from '@/services/Api'

export default {
  check_username (credentials) {
    return Api().post('authenticate', credentials)
  }
}
