'use strict'

const http = require('http')
const express = require('express')

const bodyParser = require('body-parser');
const morgan = require('morgan')
const yamaWebApi= require("./yama-web-api")
const port = 3000


const webServer = express()
webServer.use(morgan('dev'))
webServer.use(bodyParser.json());
yamaWebApi(webServer)
http
    .createServer(webServer)
    .listen(3000, () => console.log('Server running on port ' + port))

