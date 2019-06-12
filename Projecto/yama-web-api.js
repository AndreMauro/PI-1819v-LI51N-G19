'use strict'

const url = require('url')
//const Yama = require('./lib/yama-mock')
const Yama = require('./lib/yama-services')

const es = {
    host: 'localhost',
    port: '9200',
    yama_index: 'yama',
    lastfm_api: 'http://ws.audioscrobbler.com/2.0/?method=',
    apiKey: 'b77a32de4783768b503960440aa1740e'
}


const yama = Yama.init(es)

module.exports = (app) => {

    app.get('/yama/searchArtist/:artistName', getArtist)
    app.get('/yama/artist/:artistName/Albums', getAlbums)
    app.get('/yama/artist/:artistName/Album/:albumName', getAlbumsDetails)
    app.use(checkAuthentication)
    app.post('/yama/playlists', createPlaylist) // post
    app.get('/yama/playlists/:playlistId', getPlaylistById) //singlePlaylist
    app.put('/yama/playlists/:playlistId', editPlaylist)   //put
    app.get('/yama/playlists/', getPlaylists) //allPlaylists
    app.post('/yama/playlists/:playListId', insertMusic)
    app.delete('/yama/playlists/:playListId?artist=:artist&track=:track', deleteMusic)
    app.get('/yama/playlists/:playListId/totaltime',getTotalTime)

    app.use(resourceNotFond)

    function checkAuthentication(req, resp, next) {
        if(req.isAuthenticated())
			next()
        else{
			//util.showAlert('Não tem acesso a estes recursos')
			next({
				'statusCode': 401,
				'err': 'Cannot access foca by unauthenticated users!'
			})
		} 
    }

    // http://localhost:3000/yama/searchArtist/:artistName
    function getArtist(req, resp) {
        const artistName = req.params.artistName

        yama.getArtist(artistName)
            .then((body) => {
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
        const artistName = req.params.artistName

        yama.getAlbums(artistName)
            .then((body) => {
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
    function getAlbumsDetails(req, resp) {
        const artistName = req.params.artistName
        const albumName = req.params.albumName

        yama.getAlbumsDetails(artistName, albumName)
            .then((body) => {            
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
        yama.createPlaylist(req.user._id, req.body.name, req.body.description)
            .then(data => resp.status(201).end(JSON.stringify(data)))
            .catch(err => next(err))

    }


    //http://localhost:3000/yama/playlists/{playlistId}
    function getPlaylistById(req, resp, next) {
        let id = req.params.playlistId
        yama.getPlaylistById(req.user._id, id)
            .then(data => {
                resp.statusCode = 200
                resp.end(JSON.stringify(data))
            })
            .catch(err => {
                resp.statusCode = err.statusCode
                resp.end()
            })
    }
}

      //http://localhost:3000/yama/playlists/:playListId/totaltime
    function getTotalTime(req, resp,next){
        let id = req.params.playlistId
        yama.getTotalTime(id) 
        .then( data => {
            resp.statusCode = 200
            resp.end(JSON.stringify(data))
        })
        .catch(err => {
            resp.statusCode = err.statusCode
            resp.end()
        })
    }

function editPlaylist(req, resp, next) {
    let id = req.params.playlistId
    yama.editPlaylist(req.user._id, id, req.body.name, req.body.description)
        .then(data => resp.status(200).end(JSON.stringify(data)))
        .catch(next)
}

//http://localhost:3000/yama/playlists/
function getPlaylists(req, resp, next) {
    yama.getPlaylists(req.user._id)
        .then(body => {
            resp.statusCode = 200
            resp.end(JSON.stringify(body))
        })
        .catch(err => next(err))
}

//http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=b77a32de4783768b503960440aa1740e&artist=cher&track=believe&format=json' 
//http://localhost:3000/yama/playlists/{playListId}/   
function insertMusic(req, resp, next) {
    let playListId = req.params.playListId
    yama.insertMusic(req.user._id, playListId, req.body.artist, req.body.track)
        .then(body => {
            resp.statusCode = 200
            resp.end(JSON.stringify(body))
        })
        .catch(err => {
            resp.statusCode = err.statusCode
            resp.end(JSON.stringify(err.message))
        })


}

//http://localhost:3000/yama/playlists/{playListId}/?artist={artist}&track={track}  
function deleteMusic(req, resp, next) {
    let { query } = req.query
    let playListId = req.params.playListId
    yama.deleteMusic(req.user._id, playListId, query.artist, query.track)
        .then(data => res.status(200).end(JSON.stringify(data)))
        .catch(err => {
            resp.statusCode = err.statusCode
            resp.end(JSON.stringify(err.message))
        })
}

function resourceNotFond(req, resp, next) {
    next(JSON.stringify({
        'code': 404,
        'message': 'Resource Not Found'
    }))
}





