'use strict'

const request = require('request')

//Modulo onde estão todos os serviços
class Yama {

    /**
     * @param {{host: string, port: number, playlists_index: string}} es 
     */
    constructor(es){  //es => ElasticSearch
        this.playlists = `http://${es.host}:${es.port}/${es.playlists_index}/playlist`
    }
    /**
     * @param {{host: string, port: number, playlists_index: string}} es 
     */
    static init(es) {
        return new Yama(es)
    }

    getArtists() { 
        const uri 
        request.get(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb))
                cb(null, body)
        })
    }

    getAlbums() {
        const uri
        request.get(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb))
                cb(null, body)
        })
    }

    getAlbumsDetails() {
        const uri
        request.get(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb))
                cb(null, body)
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

module.exports = Yama