const request = require('request')
const rp = require('request-promise')

class YamaDB {

    constructor(es){
        this.yamaUrl = `http://${es.host}:${es.port}/${es.yama_index}`
        this.playlist = `http://${es.host}:${es.port}/${es.yama_index}/playlist`
    }

    static init(es){
        return new YamaDB(es)
    }
     
    //
    createPlaylist(name, description){
        const options = {
            'method': 'POST',
            'uri': `${this.playlist}`,
            'json': true,
            'body': {'name': name,
                    'description': description,
                    'musics': [] 
                }
        }
        return rp(options)
            .then(
                body => {
                    return { "id":body._id}
                }
            )
    }
    
    getPlaylistById(id){
        const uri = `${this.playlist}/${id}`

        return rp({
            'method': 'GET',
            'url' : uri,
            'json' : true
        })
       .then(body =>{
               // body = JSON.parse(body)   
                let playlist = {}         
                playlist.id = body._id
                playlist.name = body._source.name
                playlist.description = body._source.description
                playlist.musics = body._source.musics
                 
                return playlist
            })
    }

    editPlaylist(id,name, description){
       return this.getPlaylistById(id)
       .then ( body => {  
        
        body.name=name
        body.description=description

        const options = {
            'method': 'PUT' ,
            'uri': `${this.playlist}/${id}`,
            'json': true,
            'body': body
        }
        return options
        })
        .then(options => {
            return rp(options)
            .then(
                body => {
                    return { "id" : body._id}
                  }
            )
         })
    }

    getPlaylists(){       
        const uri = `${this.playlist}/_search`

        return rp({
            'method': 'GET',
            'url' : uri,
            'json' : true  
        })
        .then( body => {body = body.hits.hits 
        let obj = {'playlists':[]}  // passing groups array to be consistent
                body.forEach(p => {
                    obj.playlists.push({
                        'id':p._id,
                        'name': p._source.name,
                        'description':p._source.description,
                        'musics': p._source.musics
                    })
                })
               return obj
        })
    }

    insertMusic(playListId, music){
        return this.getPlaylistById(playListId)
        .then(body => {
            body.musics.push(music)
            
            const options = {
                'method': 'PUT',
                'uri': `${this.playlist}/${playListId}`,
                'json': true,
                'body': playlist
            }
            return options
        })
        .then(options=> {
            return rp(options)
            .then(
                body => {
                  return  body
                }
            )
        })
    }

    deleteMusic(playlistId, artist, track){
       return this.getPlaylistById(playlistId)
        .then(body =>{
            body.musics =  playlist.musics.filter( m => m.name != track && m.artist != artist)
    
           
            const options = {
                'method':'PUT',
                'uri': `${this.playlist}/${playlistId}`,
                'json': true,
                'body': body
            }
            return options
        })

        .then(options => {
            return rp(options)
            .then(
                body => {
                  return  body
                }
            )
        })
    }
}





    module.exports = YamaDB