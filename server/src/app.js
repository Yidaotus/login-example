console.log('hello')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
// Für gute debug Ausgaben
app.use(morgan('combined'))
// Für Cross-Origin requests da unser node Server und somit die REST Api
// auf einem anderen port ausgeführt werden als unser Vue test server
app.use(cors())
app.use(bodyParser.json())

// var dbHost = config.get('Database.host')
// var dbPort = config.get('Database.port')
// var dbUser = config.get('Database.username')
// var dbPassword = config.get('Database.password')

require('./routes')(app)

app.listen(process.env.PORT || 8081)
