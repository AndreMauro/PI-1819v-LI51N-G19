'use strict'
const request = require('request')


class LastfmData {
    constructor(es){
        
        console.log('8 lastfmData init es ' + JSON.stringify(es))
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
    }

//http://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=Djodje&album=FeedBack&api_key=b77a32de4783768b503960440aa1740e&format=json
    getAlbumDetail(artistName, albumName, cb){
        let method = 'album.getInfo'
        const options = {
            'uri': `${this.lastfmDataApi}${method}&artist=${artistName}&album=${albumName}&api_key=${this.api_key}&format=json`,

        }
        console.log('lastfm getalbumdetais')

        console.log('option ' + JSON.stringify(options))
        request.get(options , (err, res, body) => {
            if(!reportError(200, err, res, body, cb)){

                body = JSON.parse(body)
                cb(null, body)
            }
        })
    }
}


function reportError(statusOk, err, res, body, cb) {
    if(err) {
        console.log('44 err ' +err)
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
//
module.exports = LastfmData



