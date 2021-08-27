const express = require('express')
const morgan = require('morgan')  
require('dotenv').config()
require('./mqtt')
const PLC = require('./devices/plc')
PLC()

const { port } = require('./config')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms'))


//routes
app.use('/tags', require('./routes/tag'))
app.use('/', (req,res) => res.redirect('/tags'))

app.listen(port, () => console.log(`Server running on port ${port}`))
