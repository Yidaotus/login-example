console.log('hello')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
// For good debug messages
app.use(morgan('combined'))
// Für Cross-Origin requests da unser node Server und somit die REST Api
// auf einem anderen port ausgeführt werden als unser Vue test server
app.use(cors())
app.use(bodyParser.json())

app.get('/status', (req, res) => {
  res.send({
    message: 'hello world!'
  })
})

app.post('/authenticate', (req, res) => {
  res.send({
    message: `All good! Welcome ${req.body.username}`
  })
})

app.listen(process.env.PORT || 8081)
