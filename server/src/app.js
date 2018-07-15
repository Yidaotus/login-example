const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const morgan = require('morgan')

const app = express()
// Für gute debug Ausgaben
// app.use(morgan('combined'))
// Für Cross-Origin requests da die REST Api auf einem anderen
// port ausgeführt wird als unser Vue server
app.use(cors())
app.use(bodyParser.json())

require('./routes')(app)

app.listen(process.env.PORT || 8081)
