'use strict'

const url = require('url')
//const Yama = require('./lib/yama-mock')
const Yama = require('./lib/yama-services')


const es = {
    host: 'localhost',
    port: '9200',
    yama_index: 'yama',
    lastfm_api:'http://ws.audioscrobbler.com/2.0/?method=', 
    apiKey: 'b77a32de4783768b503960440aa1740e' 
}

const yama = Yama.init(es)

module.exports = (app) => {
    app.use(getArtist)
    app.use(getAlbums)
    app.use(getAlbumsDetails)
    app.use(createPlaylist) // post
    app.use(getPlaylistById) //singlePlaylist
   app.use(editPlaylist)   //put
    app.use(getPlaylists) //allPlaylists
    /*  app.use(insertMusic)
    app.use(deleteMusic)

   /* Gerir playlists (listas de músicas favoritas):
    Criar, atribuindo-lhe um nome e descrição
    Editar, alterando o seu nome e descrição
    Listar
    Obter os detalhes, onde consta: o nome, descrição, total de tempo das músicas que o constituem e os detalhes de cada música (nome e duração).
    Adicionar uma música
    Remover uma música*/


    app.use(resourceNotFond)
    return app

    // http://localhost:3000/yama/searchArtist?artistName={artistName}
    function getArtist(req, resp){
        const {pathname, query} = url.parse(req.url, true) // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: request to ${pathname}`)

        
        var regex = /^\/yama\/searchArtist\?artistName=+\w+$/i
        if(method == 'GET' && regex.exec(req.url)){ //as rotas estão no readme do git
           
           
            let artistName = query.artistName
           
            if(artistName == null) return false
            
            yama.getArtist(artistName, (err, data) => { 
                if(err) {
                    resp.statusCode = err.statusCode
                    resp.end()
                } else {
                    console.log(JSON.stringify(data))
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            })
            return true
        }
        return false

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
                    resp.end('err')
                }else{
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            })
            return true
        }
        return false
    }
    
    //http://localhost:9200/playlists
    function createPlaylist(req, resp) {
        const uri = url.parse(req.url, true)
        const method = req.method
        var regex = /^\/yama\/playlists+$/i

        if (method == 'POST' && regex.exec(req.url)) { //faz match

        bodyRequestFunction(req, body => {
            yama.createPlaylist(body.name, body.description, (err, data) => {
                if (err) {
                    resp.statusCode = err.code
                    resp.end()
                } else {
                    resp.statusCode = 201
                    resp.end(JSON.stringify(data))
                }
            })
        })
        return true
        }
        return false
    }


    //http://localhost:9200/yama/playlists/{playlistId}
    function getPlaylistById(req, resp) {
        const uri = url.parse(req.url, true)
        const {pathname} = uri
        const method = req.method
        console.log('URL ' + req.url)
        let id = pathname.split('/')[3]
        var regex = /^\/yama\/playlists\/+\w+$/i
        
        if (method == 'GET' && regex.exec(req.url)) {
          yama.getPlaylistById(id, (err, data) => {
                if (err) {
                    resp.statusCode = err.code
                    resp.end()
                } else {
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            })
            return true
        }
        return false
    }

    function editPlaylist(req, resp) {
        const {pathname, query} = url.parse(req.url, true)
        const method = req.method

        var regex = /^\/yama\/playlists\/+\w+\?name=+\w+\&description=+\w+$/i

        console.log('URL ' + req.url)
        const {name, description} = query
        if (method == 'PUT' && regex.exec(req.url)){
            let id = pathname.split('/', 4)[3]
            
            yama.editPlaylist(id, name, description, (err, data) => {
                if(err){
                    resp.statusCode = err.code.resp.end()
                }else{
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            } )
            return true
        }
        return false
    }

    //http://localhost:3000/yama/playlists/
    function getPlaylists(req, resp) {
        const {pathname} = url.parse(req.url, true)
        const method = req.method
         var regex = /^\/yama\/playlists\/+$/i
         if (method == 'GET' && regex.exec(pathname)) {
            
            yama.getPlaylists((err, data) => {
                if (err) {
                    resp.statusCode = err
                        .code
                        resp
                        .end()
                } else {
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            })
            return true
        }
        return false
    }

    //http://localhost:9200/playlists/{playlistName}
    function insertMusic(req, resp) {
        
        const {pathname} = url.parse(req.url, true)
        const method = req.method
       
        var regex = /^\/yama\/playlist\/+$/i //TODO DEFINIR ROTA
     
        if (method == 'POST' && regex.exec(req.url)){
            console.log('inside insertteamingroup');
            yama.insertMusic(parameters, (err, data) => {
                if(err){
                    resp.statusCode = err.code.resp.end()
                }else{
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            })
            return true
        }
        return false
    }

    //http://localhost:9200/playlists/?playlistName={playlistName}&music={mbdi}
    function deleteMusic(req, resp) {
        const uri = url.parse(req.url, true)
        const {pathname, query} = uri
        const method = req.method
        var regex = /^\/yama\/playlist\/+$/i //TODO DEFINIR ROTA
    
        if (method == 'DELETE' && regex.exec(req.url)) {
            yama.deleteMusic(something, (err,data) => {
                if(err){
                    resp.statusCode = err.code.resp.end()
                }else{
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            })
            return true
        }
        return false
    }

    //bodyRequestFunction
    function bodyRequestFunction(req, cb){
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
             body = Buffer.concat(body).toString();
             cb(JSON.parse(body))
        });
    }
    function resourceNotFond(req, resp) {
        resp.statusCode = 404
        resp.end('Resource Not Found!')
        return true
    }

}