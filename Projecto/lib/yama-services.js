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
        this.YamaDb = YamaDb.init(es)
        this.lastfm = LastfmData.init(es)
        //this.playlists = `http://${es.host}:${es.port}/${es.playlists_index}/playlist`

    }
    /**
     * @param {{host: string, port: number, playlists_index: string}} es 
     */
    static init(es) {
        return new Yama(es)
    }

    getArtist(artistName, cb) { 
        this.lastfm.getArtist(artistName, cb)
    }

    getAlbums(artistNanem, cb) {
        this.lastfm.getAlbums(artistNanem, cb)
    }

    getAlbumsDetails(artistName, albumName, cb) {
        this.lastfm.getAlbumDetail(artistName, albumName, cb)
    }

    createPlaylist(name, description, cb) {
        this.YamaDb.createPlaylist(name, description, cb)

    }

    getPlaylistById(id, cb){
        this.YamaDb.getPlaylistById(id,cb)
    }

    editPlaylist(id, name, description, cb){
        this.YamaDb.editPlaylist(id,name, description, cb)
    }
    getPlaylists(cb){
        this.YamaDb.getPlaylists(cb)
    }

    insertMusic(playListId, artist, track, cb){
        this.lastfm.getMusic( artist, track, (err, music)=>{
            this.YamaDb.insertMusic(playListId, music, cb)
        })
    }

    deleteMusic(playListId, artist, track, cb){
        this.YamaDb.deleteMusic(playListId, artist, track, cb)
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