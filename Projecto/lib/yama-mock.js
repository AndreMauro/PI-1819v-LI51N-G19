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
                        'id': 1,  //um id qualquer
                        'name': name,
                        'description': description,
                        'musics': [] 
                         }
            yamadb.playlists.push(playlist)
            cb(null, yamadb)
    }

    editPlaylist(id, cb){

    }

    getPlaylistByID(id, cb){

    }

    getAllPlaylists(cb){

    }


        //TODO incluir os mocks do YamaDb-Mock
}

module.exports = Yama