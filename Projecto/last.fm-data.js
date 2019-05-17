'use strict'
const rp = require('request-promise')


class LastfmData {
    constructor(es){
        this.lastfmDataApi = es.lastfm_api
        this.api_key = es.apiKey
    }
    static init(es){
        return new LastfmData(es)
    }


//http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=b77a32de4783768b503960440aa1740e&format=json
    getArtist(artistName){
        let method = 'artist.search'
       // console.log("entrouu")

        const options= {
            
            'uri': `${this.lastfmDataApi}${method}&artist=${artistName}&api_key=${this.api_key}&format=json`,
            'json' : true
        }

        return rp.get(options)
            .then( body => {
                var artists=body.results.artistmatches.artist
                var retArtists= []
                artists.forEach(element => {
                    var artist= new Object()
                    artist.name = element.name
                    artist.listeners = element.listeners
                    artist.mbid = element.mbid
                    retArtists.push(artist)
                    })
                return retArtists
            })
    }
         
   

//http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Eminem&api_key=b77a32de4783768b503960440aa1740e&format=json
    getAlbums(artistName){
        let method = 'artist.gettopalbums'
        const options = {
            
            'uri': `${this.lastfmDataApi}${method}&artist=${artistName}&api_key=${this.api_key}&format=json`,
            'json' : true
        }
        

        return rp.get(options) 
            .then( body => {

                //body = JSON.parse(body)
                var albums = (body["topalbums"])["album"]
                var retAlbums = []
                albums.forEach(element => {
                    var album = new Object()
                    album.Name = element["name"]
                    album.Url = element["url"]
                    album.Playcount = element["playcount"]
                    element["image"].forEach(img => {
                        if(img["size"] == 'extralarge')
                        album.Image = img["#text"]
                    })
                    retAlbums.push(album)
                });
                return retAlbums
            })
        
    }

//http://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=Djodje&album=FeedBack&api_key=b77a32de4783768b503960440aa1740e&format=json
    getAlbumDetail(artistName, albumName){
        let method = 'album.getInfo'

        const options = {
            
            'uri': `${this.lastfmDataApi}${method}&artist=${artistName}&album=${albumName}&api_key=${this.api_key}&format=json`,
            'json' : true
        }

        return rp.get(options) 
            .then( body => {
        
                //body = JSON.parse(body)
                const albumDetail = {"name": body.album.name,
                                     "artist": body.album.name}
                
                body.album["image"].forEach(img => {
                    if(img["size"] == 'extralarge')
                    albumDetail.Image = img["#text"]
                })
                
                albumDetail.tracks = []
                body.album.tracks.track.forEach( music => {
                    let musicDetails =
                    {
                        "name": music.name,
                        "duration": music.duration,
                        "rank" : music["@attr"].rank
                    }
                    
                    albumDetail.tracks.push(musicDetails)
                })
                return albumDetail
               
            })
        }
    

    //http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=b77a32de4783768b503960440aa1740e&artist=cher&track=believe&format=json' 
    getMusic( artist, track){
        let method = 'track.getInfo'

        const options = {
            
            'uri': `${this.lastfmDataApi}${method}&artist=${artist}&track=${track}&api_key=${this.api_key}&format=json`,
            'json' : true
        }

        return rp.get(options)
        .then(body => {
            {
                //body = JSON.parse(body)

                let music = {
                    "artist" : artist,
                    "name" : track,
                    "duration" : body.track.duration,
                    "playciplaycountynt": body.track.playcount
                }
               return music
            }
        })

    }
}

module.exports = LastfmData



