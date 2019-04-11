'use strict'

const url = require('url')
const Yama = require('./lib/yama-mock')
//const Yama = require('./lib/yama-services')


const es = {
    host: 'localhost',
    port: '9200',
    yama_index: 'playlists',
    lastfm_api:'http://ws.audioscrobbler.com/2.0/?method=', 
    apiKey: 'b77a32de4783768b503960440aa1740e' 
}

const yama = Yama.init(es)

module.exports = (app) => {
    app.use( getArtist)
    app.use(getAlbums)
    app.use(getAlbumsDetails)
    app.use(resourceNotFond)
    return app

    // http://localhost:3000/yama/searchArtist
    function getArtist(req, resp){
        

    }


    //Path -> http://localhost:3000/yama/artist/{artistName}/Albums
    function getAlbums(req, resp) {
        const {pathname} = url.parse(req.url, true) // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: request to ${pathname}`)

        
        var regex = /^\/yama\/artist\/+\w+\/Albums+$/i
        if(method == 'GET' && regex.exec(req.url)){ //as rotas estão no readme do git
            let artistName = pathname.split('/')[3]
            if(artistName == null) return false
            
            yama.getAlbums(artistName, (err, albums) => { 
                if(err) {
                    resp.statusCode = err.statusCode
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

    //Get the metadata and tracklist for an album on Last.fm using the album name or a musicbrainz id.
    //http://localhost:3000/yama/artist/{artistName}/Album/{albumName}
    function getAlbumsDetails(req, resp){
        const {pathname} = url.parse(req.url, true)
        const method = req.method

        console.log(`${Date()}: request to ${pathname}`)
        var regex = /^\/yama\/artist\/+\w+\/Album\/+\w+$/i
        if(method == 'GET' && regex.exec(req.url)){
            let artistName = pathname.split('/')[3]
            let albumName = pathname.split('/')[5]

            yama.getAlbumsDetails(artistName, albumName, (err, data)=> {
                if(err){
                    resp.statusCode = err.statusCode
                    resp.end()
                }else{
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
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