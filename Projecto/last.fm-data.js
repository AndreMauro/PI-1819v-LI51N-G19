'use strict'
const request = require('request')


class LastfmData {
    construtor(es){
        this.lastfmDataApi ='${es.lastfm_api}'
        this.api_key = es.api_key;
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
//
module.exports = LastfmData



