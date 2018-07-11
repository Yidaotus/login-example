const Authentication = require('./controllers/Authentication')

module.exports = (app) => {
  app.post('/authenticate',
    Authentication.authenticate_user)
}
