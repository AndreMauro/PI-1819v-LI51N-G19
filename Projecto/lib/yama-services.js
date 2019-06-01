'use strict'

const request = require('request-promise')
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

    getArtist(artistName) { 
       return this.lastfm.getArtist(artistName)
       .catch(err => 
         Promise.reject({statusCode: 404}
        ))
    }

    getAlbums(artistNanem) {
        return this.lastfm.getAlbums(artistNanem)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))
    }

    getAlbumsDetails(artistName, albumName) {
        return this.lastfm.getAlbumDetail(artistName, albumName)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))
    }

    createPlaylist(name, description) {
       return this.YamaDb.createPlaylist(name, description)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))

    }

    getPlaylistById(id){
        return this.YamaDb.getPlaylistById(id)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))
    }

    editPlaylist(id, name, description){
        return this.YamaDb.editPlaylist(id,name, description)
        .catch(err => 
            Promise.reject({statusCode: 404,
            err: err}
           ))
    }
    getPlaylists(){
        return this.YamaDb.getPlaylists()
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))
    }

    insertMusic(playListId, artist, track){
        return this.lastfm.getMusic( artist, track)
        .then( music =>{
           return this.YamaDb.insertMusic(playListId, music)
        })
            .catch(err => Promise.reject(err))
    }

    deleteMusic(playListId, artist, track){
        return this.YamaDb.deleteMusic(playListId, artist, track)
                .catch(err => Promise.reject(err))
    }

}




module.exports = Yama