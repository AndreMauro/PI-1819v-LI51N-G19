'use strict'
const YamaWebApi= require("./yama-web-api")
const express = require('express')
const morgan = require('morgan')
let port = 3000

const yamaWS = express()
yamaWS.use(morgan('dev'))
YamaWebApi(yamaWS)

http
    .createServer(yamaWS)
    .listen(port, () => console.log('Server running on port '+ port))