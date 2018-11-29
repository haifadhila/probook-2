const express = require('express'),
      port = process.env.PORT || 7000,
      bodyParser = require('body-parser'),
      routes = require('./src/routes/routing')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
routes(app)

console.log(`Listening at port ${port}`)
app.listen(port)
