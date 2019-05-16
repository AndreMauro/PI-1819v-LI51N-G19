'use strict'
const artist = require('./yama-artist-mock')
const albums = require('./yama-albums-mock')
const albumDetails = require('./yama-album-details-mock')
const yamadb = { "playlists": [] }

class Yama {

    static init() {
        return new Yama()
    }

    getArtist(artistName) {
        console.log('mock artist ' + artistName)
        console.log(artist)
        let artistrsult
        if( artist){
             artistrsult = artist.artist.filter(function (item) {
            return (
                item.name.includes(artistName))
                })
        }
        return new Promise((resolve, reject) => {
            return (artistrsult != null && artistrsult.length> 0) ? resolve(artistrsult) : reject({statusCode: 404})
            })
        
    
        
    }

    getAlbums(artistName) {
        const returnedAlbums = albums[artistName]
       
        return new Promise((resolve,reject) => {
            return (returnedAlbums)? resolve(returnedAlbums) : reject({statusCode: 404})
        })
        
    
    }

    getAlbumsDetails(artistName, albumName) {
        const albumD= albumDetails.album
        return new Promise((resolve,reject) => {
             return (albumDetails != null && albumDetails.album.name == albumName && albumDetails.album.artist == artistName) ?
                resolve(albumD) : reject({statusCode: 404})
            
        })
    }


    createPlaylist(name, description) {
        const playlist = {
            'id': yamadb.playlists.length + 1,  //um id qualquer
            'name': name,
            'description': description,
            'duration': 0,
            'musics': []
        }
        yamadb.playlists.push(playlist)
        return Promise(playlist) 
    }

    getPlaylists() {
        return new Promise((resolve, reject) => {
            return (yamadb.playlists) ? resolve(yamadb) : reject({statusCode: 404})
            })
    }

    getPlaylistById(id) {
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                   return Promise(element) 
                }
            })
            Promise.reject({code:404})
    }

    editPlaylist(id, name, description) {
        var playlist
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    element.name = name
                    element.description = description
                    playlist = element
                }
            })
        return Promise(playlist)
    }

    insertMusic(id, artist, track) {
        var musics = {
            "artist": artist,
            "track": track
            }
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    element.musics.push(music)
                   // element.duration += music.duration
                    //musics = element.musics
                }
            })
        return Promise(musics)
    }

    deleteMusic(id, artist, track) {
        var musicList =  {
            "artist": artist,
            "track": track
            }
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    var index = element.musics.findIndex(x => JSON.stringify(x) === JSON.stringify(music));
                    if (index == -1) {
                        Promise.reject({code:404})
                    }
                    element.musics.splice(index, 1);
                  //  element.duration -= music.duration
                    musicList = element.musics
                }
            })
        return Promise( musicList)
    }


    //TODO incluir os mocks do YamaDb-Mock
}

module.exports = Yama