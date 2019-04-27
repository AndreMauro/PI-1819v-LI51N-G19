'use strict'
const artist = require('./yama-artist-mock')
const albums = require('./yama-albums-mock')
const albumDetails = require('./yama-album-details-mock')
const yamadb = { "playlists": [] }

class Yama {

    static init() {
        return new Yama()
    }

    getArtist(artistName, cb){
        var artistrsult = artist.artist.filter( function(item){return (
            item.name.includes(  artistName));
        } );
            if(artistrsult.length>0){
                cb(null, artistrsult)
            }
            else{
                cb({statusCode: 404})
            }
    }

    getAlbums(artistName, cb) {
        const returnedAlbums = albums[artistName]
        if (!returnedAlbums) {
            cb({ statusCode: 404 })
        } else {
            cb(null, returnedAlbums)
        }
    }

    getAlbumsDetails(artistName, albumName, cb){
            if(albumDetails!= null && albumDetails.album.name == albumName && albumDetails.album.artist == artistName){
                cb(null, albumDetails.album)
            }
            else{
                cb({statusCode: 404})
            }
        }

    
    createPlaylist(name, description, cb){
        const playlist = {
                        'id': yamadb.playlists.length + 1,  //um id qualquer
                        'name': name,
                        'description': description,
                        'duration': 0,
                        'musics': [] 
                         }
            yamadb.playlists.push(playlist)
            cb(null, playlist.id)
    }

    getPlaylists(cb) {
        if (!yamadb.playlists) {
            cb({ code: 404 })
        } else {
            cb(null, yamadb.playlists)
        }
    }

    getPlaylist(id, cb) {
        yamadb.playlists
        .forEach(element => {
            if (element.id == id) {
                cb(null, element)
            }
        })
        cb({ code: 404 })
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

    addMusic(id, music, cb) {
        var musics
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    element.musics.push(music)
                    element.duration += music.duration
                    musics = element.musics
                }
            })
        cb(null, musics)
    }

    removeMusic(id, music, cb) {
        var musicList
        yamadb.playlists
            .forEach(element => {
                if (element.id == id) {
                    console.log(element.musics[0])
                    console.log(music)
                    console.log(element.musics[0] == music)
                    var index = element.musics.indexOf(music);
                    console.log(index)
                    if (index > -1) {
                        element.musics.splice(index, 1);
                    }
                    element.duration -= music.duration
                    musicList = element.musics
                }
            })
        cb(null, musicList)
    }


        //TODO incluir os mocks do YamaDb-Mock
}

module.exports = Yama