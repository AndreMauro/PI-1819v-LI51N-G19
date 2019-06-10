'use strict'

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const authWebApi = require('./auth-web-api')
const yamaWebApi= require("./yama-web-api")
const nconf = require('nconf')
const expressSession = require('express-session')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')

const port = 3000

nconf
    .argv()
    .env()
    .defaults({'NODE_ENV': 'development'})
const NODE_ENV = nconf.get('NODE_ENV')
const isDev = NODE_ENV == 'development'
console.log('Running ' + NODE_ENV)



const webServer = express()
webServer.use(morgan('dev'))
webServer.use(bodyParser.json())
webServer.use(expressSession({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
webServer.use(frontEndMiddleware(isDev))

authWebApi(webServer)
yamaWebApi(webServer)
http
    .createServer(webServer)
    .listen(3000, () => console.log('Server running on port ' + port))

function frontEndMiddleware(isDev) {
    return isDev
        ? webpackMiddleware(webpack(webpackConfig))
        : express.static('dist')
}