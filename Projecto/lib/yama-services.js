'use strict'

const request = require('request')
const LastfmData = require('../last.fm-data')
const YamaDb = require('../yama-db')

//Modulo onde estão todos os serviços
class Yama {

    /**
     * @param {{host: string, port: number, playlists_index: string}} es 
     */
    constructor(es){  //es => ElasticSearch
       // this.yamadb = YamaDb.init(es)
        this.lastfm = LastfmData.init(es)
        //this.playlists = `http://${es.host}:${es.port}/${es.playlists_index}/playlist`

    }
    /**
     * @param {{host: string, port: number, playlists_index: string}} es 
     */
    static init(es) {
        console.log('23 Services es ' + JSON.stringify(es))
        return new Yama(es)
    }

    getArtists() { 
    }

    getAlbums() {
    }

    getAlbumsDetails(artistName, albumName, cb) {
        this.lastfm.getAlbumDetail(artistName, albumName, cb)
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

module.exports = Yama