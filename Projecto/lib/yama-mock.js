'use strict'
const albumDetails = require('./yama-album-details-mock')
const albums = require('./yama-albums-mock')
const artist = require('./yama-artist-mock')

class Yama {

    static init() {
        return new Yama()
    }

    getArtist(artistName, cb){
        //verificar se o nome do artista é igual ao artista que ta no mock
        //caso de erro
        //caso de sucesso
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
        console.log(artistName)
            if(albumDetails!= null && albumDetails.album.name == albumName && albumDetails.album.artist == artistName){
                cb(null, albumDetails)
            }
            else{
                cb({statusCode: 404})
            }
        }
}

module.exports = Yama