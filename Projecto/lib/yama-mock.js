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

    getAlbums(artistName, cb) {
        const returnedAlbums = albums[artistName]
        if (!returnedAlbums) {
            cb({ statusCode: 404 })
        } else {
            cb(null, returnedAlbums)
        }
    }

    getAlbumsDetails(artistName, albumName, cb) {
        if (albumDetails != null && albumDetails.album.name == albumName && albumDetails.album.artist == artistName) {
            cb(null, albumDetails.album)
        }
        else {
            cb({ statusCode: 404 })
        }
    }


    createPlaylist(name, description, cb) {
        const playlist = {
            'id': yamadb.playlists.length + 1,  //um id qualquer
            'name': name,
            'description': description,
            'duration': 0,
            'musics': []
        }
        yamadb.playlists.push(playlist)
        cb(null, playlist)
    }

    getPlaylists(cb) {
        if (!yamadb.playlists) {
            cb({ statusCode: 404 })
        } else {
            cb(null, yamadb)
        }
    }

    getPlaylistById(id, cb) {
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    cb(null, element)
                }
            })
        cb({ statusCode: 404 })
    }

    editPlaylist(id, name, description, cb) {
        var playlist
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    element.name = name
                    element.description = description
                    playlist = element
                }
            })
        cb(null, playlist)
    }

    insertMusic(id, artist, track, cb) {
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
        cb(null, musics)
    }

    deleteMusic(id, artist, track, cb) {
        var musicList =  {
            "artist": artist,
            "track": track
            }
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    var index = element.musics.findIndex(x => JSON.stringify(x) === JSON.stringify(music));
                    if (index == -1) {
                        cb({ statusCode: 404 })
                    }
                    element.musics.splice(index, 1);
                  //  element.duration -= music.duration
                    musicList = element.musics
                }
            })
        cb(null, musicList)
    }


    //TODO incluir os mocks do YamaDb-Mock
}

module.exports = Yama