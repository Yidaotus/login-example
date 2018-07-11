const Authentication = require('./controllers/Authentication')
const AuthenticationValidator = require('./controllers/AuthenticationValidator')

module.exports = (app) => {
  app.post('/authenticate',
    AuthenticationValidator.validate,
    Authentication.authenticate_user)
}
