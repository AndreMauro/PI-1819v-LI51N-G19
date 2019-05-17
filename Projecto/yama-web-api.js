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
    app.get('/yama/searchArtist/:artistName', getArtist)
    app.get('/yama/artist/:artistName/Albums',getAlbums)
    app.get('/yama/artist/:artistName/Album/:albumName', getAlbumsDetails)
    app.post(createPlaylist) // post
    app.get('/yama/playlists/:playlistId', getPlaylistById) //singlePlaylist
    app.put(editPlaylist)   //put
    app.get('/yama/playlists', getPlaylists) //allPlaylists
    app.post('/yama/playlists/:playListId', insertMusic)
    app.delete('/yama/playlists/:playListId/?artist=:artist&track=:track', deleteMusic)

   /* Gerir playlists (listas de músicas favoritas):
    Criar, atribuindo-lhe um nome e descrição
    Editar, alterando o seu nome e descrição
    Listar
    Obter os detalhes, onde consta: o nome, descrição, total de tempo das músicas que o constituem e os detalhes de cada música (nome e duração).
    Adicionar uma música
    Remover uma música*/


    app.use(resourceNotFond)
    return app

    // http://localhost:3000/yama/searchArtist/:artistName
    function getArtist(req, resp){
      console.log('yap geting an artist for you')
      const artistName = req.params.artistName
      
      yama.getArtist(artistName)
            .then((body)=> {
                resp.statusCode = 200
                resp.end(JSON.stringify(body))
            })
            .catch((err => {
                console.log(err)
                resp.statusCode = err.statusCode
                resp.end()
            }))
    }


    //Path -> http://localhost:3000/yama/artist/{artistName}/Albums
    function getAlbums(req, resp) {
      
        const artistName=req.params.artistName

        yama.getAlbums(artistName)
            .then((body)=> {
                resp.statusCode = 200
                resp.end(JSON.stringify(body))
            })
            .catch((err => {
                console.log(err)
                resp.statusCode = err.statusCode
                resp.end()
            }))
        
    }

    
    //Get the metadata and tracklist for an album on Last.fm using the album name or a musicbrainz id.
    //http://localhost:3000/yama/artist/{artistName}/Album/{albumName}
    function getAlbumsDetails(req, resp){
    
        const artistName = req.params.artistName
        const albumName = req.params.albumName

        yama.getAlbumsDetails(artistName, albumName)
            .then((body)=> {
                resp.statusCode = 200
                resp.end(JSON.stringify(body))
            })
            .catch((err => {
                console.log(err)
                resp.statusCode = err.statusCode
                resp.end()
            }))
    }
    
    //http://localhost:9200/playlists
    function createPlaylist(req, resp, next) {
        bodyRequestFunction(req)
        .then(body => yama.createPlaylist(body.name, body.description))
        .then(data => res.status(201).end(data))
        .catch(err => next(err))     
        
    }


    //http://localhost:3000/yama/playlists/{playlistId}
    function getPlaylistById(req, resp, next) {
        
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

    function editPlaylist(req, resp, next) {
        let id = req.params.id
        bodyRequestFunction(req)
        .then(body => yama.createPlaylist(id, body.name, body.description))
        .then(data => res.status(201).end(data))
        .catch(err => next(err))     
    }

    //http://localhost:3000/yama/playlists/
    function getPlaylists(req, resp, next) {
        bodyRequestFunction(req)
        .then(body => yama.getPlaylists())
        .then(data => res.status(201).end(data))
        .catch(err => next(err))     
            
    }

    //http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=b77a32de4783768b503960440aa1740e&artist=cher&track=believe&format=json' 
    //http://localhost:3000/yama/playlists/{playListId}/   
    function insertMusic(req, resp, next) {
        let playListId = req.params.playListId
        bodyRequestFunction(req)
            .then(body => yama.insertMusic(playListId, body.artist, body.track))
            .then(data => res.status(201).end(data))
            .catch(err => next(err))     
            
        
    }

    //http://localhost:3000/yama/playlists/{playListId}/?artist={artist}&track={track}  
    function deleteMusic(req, resp, next) {
        let playListId = req.params.playListId
        bodyRequestFunction(req)
        .then(body => yama.deleteMusic(playListId ,query.artist, query.track))
        .then(data => res.status(201).end(data))
        .catch(err => next(err))  
    }

    //bodyRequestFunction
    function bodyRequestFunction(req, cb){
        return new Promise((resolve, reject) => {
            let body = []
            req.on('data', (chunk) => {
                body.push(chunk)
            }).on('end', () => {
                body = Buffer.concat(body).toString()
                resolve(body)
            })
        })
    }
    

    function resourceNotFond(req, resp, next) {
        next({
            'code': 404,
            'message': 'Resource Not Found'
        })
    }

    
    

  
