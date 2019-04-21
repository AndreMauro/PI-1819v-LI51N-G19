'use strict'
const artist = require('./yama-artist-mock')
const albums = require('./yama-albums-mock')
const albumDetails = require('./yama-album-details-mock')


class Yama {

    static init() {
        return new Yama()
    }

    getArtist(artistName, cb){
        //verificar se o nome do artista é igual ao artista que ta no mock
        //caso de erro
        //caso de sucesso
        //console.log(artistName)
        var artistrsult = artist.artist.filter( function(item){return (
            item.name.includes(  artistName));
        } );
            if(artistrsult.length>0){
               // console.log('beforeCallBack ' + JSON.stringify(artistrsult))
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
}

module.exports = Yama