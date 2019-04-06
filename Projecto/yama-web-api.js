'use strict'

const url = require('url')
const Yama = require('./lib/yama-mock')

const es = {
    host: 'localhost',
    port: '9200'
}

const yama = Yama.init(es)

module.exports = (app) => {
    app.use(getAlbums)
    app.use(resourceNotFond)
    return app

    function getAlbums(req, resp) {
        const pathname  = req.url // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: request to ${pathname}`)
        if(method == 'GET' && pathname.indexOf('/albums?') >= 0){
            const artist = pathname.split('artist=')[1].split('&')[0]
            if(artist == null) return false
            yama.get(artist, (err, albums) => {
                if(err) {
                    resp.statusCode = err.code
                    resp.end()
                } else {
                    console.log(JSON.stringify(albums))
                    resp.statusCode = 200
                    resp.end(JSON.stringify(albums))
                }
            })
            return true
        }
        return false
    }

    function resourceNotFond(req, resp) {
        resp.statusCode = 404
        resp.end('Resource Not Found!')
        return true
    }
}