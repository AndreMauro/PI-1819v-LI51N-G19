'use strict'

const http = require('http')
const url = require('url')
const yamaWebApi= require("./yama-web-api")
const port = 3000

const webServer = new WebServer()
yamaWebApi(webServer)
http
    .createServer(webServer.router)
    .listen(port, () => console.log('Server running on port ' + port))

function WebServer() {
    const routes = []
    this.use = (r) => {
        routes.push(r)
    }
    this.router = (req, resp) => {
        const {pathname}  = url.parse(req.url, true) // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: ${method} request to ${pathname}`)
        
        for (let index = 0; index < routes.length; index++) {
            const r = routes[index]
            if(r(req, resp)) {
                // The route sends a response
                break
            }
        }
    }
}