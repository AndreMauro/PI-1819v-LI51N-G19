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

    createPlaylist(user_id, name, description) {
       return this.YamaDb.createPlaylist(user_id, name, description)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))

    }

    getPlaylistById(user_id, id){
        return this.YamaDb.getPlaylistById(user_id, id)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))
    }


    getTotalTime(id){
        return this.YamaDb.getTotalTime(id)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))
    }

    editPlaylist(user_id, id, name, description){
        return this.YamaDb.editPlaylist(user_id, id, name, description)
        .catch(err => 
            Promise.reject({statusCode: 404,
            err: err}
           ))
    }
    getPlaylists(user_id){
        return this.YamaDb.getPlaylists(user_id)
        .catch(err => 
            Promise.reject({statusCode: 404}
           ))
    }

    insertMusic(user_id, playListId, artist, track){
        return this.lastfm.getMusic( artist, track)
        .then( music =>{
           return this.YamaDb.insertMusic(user_id, playListId, music)
        })
            .catch(err => Promise.reject(err))
    }

    deleteMusic(user_id, playListId, artist, track){
        return this.YamaDb.deleteMusic(user_id, playListId, artist, track)
                .catch(err => Promise.reject(err))
    }

}




module.exports = Yama