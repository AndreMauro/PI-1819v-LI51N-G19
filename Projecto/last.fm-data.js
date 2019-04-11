'use strict'
const request = require('request')


class LastfmData {
    constructor(es){
        this.lastfmDataApi = es.lastfm_api
        this.api_key = es.apiKey
    }
    static init(es){
        return new LastfmData(es)
    }


//http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=b77a32de4783768b503960440aa1740e&format=json
    getArtist(artistName, cb){
        let method = 'artist.search'
    }

//http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Eminem&api_key=b77a32de4783768b503960440aa1740e&format=json
    getAlbums(artistName, cb){
        let method = 'artist.gettopalbums'
        const options = {
            'uri': `${this.lastfmDataApi}${method}&artist=${artistName}&api_key=${this.api_key}&format=json`,
        }

        request.get(options , (err, res, body) => {
            if(!reportError(200, err, res, body, cb)){

                body = JSON.parse(body)
                var albums = (body["topalbums"])["album"]
                var retAlbums = []
                albums.forEach(element => {
                    var album = new Object()
                    album.Name = element["name"]
                    album.Url = element["url"]
                    album.Playcount = element["playcount"]
                    element["image"].forEach(img => {
                        if(img["size"] == 'extralarge')
                        album.Image = img["#text"]
                    })
                    retAlbums.push(album)
                });
                cb(null, retAlbums)
            }
        })
    }

//http://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=Djodje&album=FeedBack&api_key=b77a32de4783768b503960440aa1740e&format=json
    getAlbumDetail(artistName, albumName, cb){
        let method = 'album.getInfo'

        const options = {
            'method': 'GET',
            'uri': `${this.lastfmDataApi}${method}&artist=${artistName}&album=${albumName}&api_key=${this.api_key}&format=json`,

        }

        request.get(options , (err, res, body) => {
            if(!reportError(200, err, res, body, cb)){
                body = JSON.parse(body)
                const albumDetail = {"name": body.album.name,
                                     "artist": body.album.name}
                
                body.album["image"].forEach(img => {
                    if(img["size"] == 'extralarge')
                    albumDetail.Image = img["#text"]
                })
                
                albumDetail.tracks = []
                body.album.tracks.track.forEach( music => {
                    let musicDetails =
                    {
                        "name": music.name,
                        "duration": music.duration,
                        "rank" : music["@attr"].rank
                    }
                    
                    albumDetail.tracks.push(musicDetails)
                })
                
                cb(null, albumDetail)
            }
        })
    }
}


function reportError(statusOk, err, res, body, cb) {
    if(err) {
        cb(err)
        return true
    }
    if(res.statusCode != statusOk) {
        cb({
            code: res.statusCode,
            message: res.statusMessage,
            error: body
        })
        return true
    }
}

module.exports = LastfmData



