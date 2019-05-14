'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const yamaWebApi= require("./yama-web-api")
const port = 4000


const webServer = express()
webServer.use(morgan('dev'))
yamaWebApi(webServer)
http
    .createServer(webServer)
    .listen(port, () => console.log('Server running on port ' + port))

