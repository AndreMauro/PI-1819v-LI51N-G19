'use strict'

const url = require('url')
const Yama = require('./lib/yama-mock')
//const Yama = require('./lib/yama-services')

const es = {
    host: 'localhost',
    port: '9200'  
}

const yama = Yama.init(es)

module.exports = (app) => {
    app.get('/yama/searchArtist', getArtist)
    app.get('/yama/artist.getTopAlbums',getAlbums)
    app.get('/yama/artist.getInfo', getAlbumsDetails)
    app.use(resourceNotFond)
    return app

    // http://localhost:3000/yama/searchArtist
    function getArtist(req, resp){

    }


    //Path -> http://localhost:3000/yama/artist.getTopAlbums 
    function getAlbums(req, resp) {
        const pathname  = req.url // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: request to ${pathname}`)
        if(method == 'GET' && pathname.indexOf('/albums?') >= 0){ //as rotas estão no readme do git
            const artist = pathname.split('artist=')[1].split('&')[0]
            if(artist == null) return false
            yama.getAlbums(artist, (err, albums) => { 
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

    //http://localhost:3000/yama/artist.getInfo
    function getAlbumsDetails(req, resp){
        const pathname = req.url
        const method = req.method

        console.log(`${Date()}: request to ${pathname}`)
    }

    function resourceNotFond(req, resp) {
        resp.statusCode = 404
        resp.end('Resource Not Found!')
        return true
    }
}