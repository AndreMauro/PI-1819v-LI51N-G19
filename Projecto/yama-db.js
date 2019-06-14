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
    createPlaylist(user_id, name, description){
        const options = {
            'method': 'POST',
            'uri': `${this.playlist}`,
            'json': true,
            'body': {'user_id': user_id,
                    'name': name,
                    'description': description,
                    'musics': [] ,
                    'totaltime': 0
                }
        }
        return rp(options)
            .then(
                body => {
                    return { "id":body._id}
                }
            )
    }
    
    getPlaylistById(user_id, id){
        const uri = `${this.playlist}/${id}`

        return rp({
            'method': 'GET',
            'url' : uri,
            'json' : true
        })
       .then(body =>{
                if(user_id != body._source.user_id)
                     return Promise.reject()
                let playlist = {}   
                playlist.user_id = body._source.user_id      
                playlist.id = body._id
                playlist.name = body._source.name
                playlist.description = body._source.description
                playlist.musics = body._source.musics
                playlist.totaltime = body._source.totaltime
                 
                return playlist
            })
    }

    editPlaylist(user_id, id, name, description){
       return this.getPlaylistById(user_id, id)
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


    getTotalTime(id){
        const uri = `${this.playlist}/${id}/${totaltime}`

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
                playlist.totaltime = body._source.totaltime
                 
                return playlist.totaltime
            })
    }

    getPlaylists(user_id){       
        const queryString =`user_id:${user_id}`
        const uri = `${this.playlist}/_search?q=${user_id}`

        return rp({
            'method': 'GET',
            'url' : uri,
            'json' : true  
        })
        .then( body => {body = body.hits.hits 
        let obj = {'playlists':[]}  // passing groups array to be consistent
                body.forEach(p => {
                    obj.playlists.push({
                        'user_id': p._source.user_id,
                        'id':p._id,
                        'name': p._source.name,
                        'description':p._source.description,
                        'musics': p._source.musics,
                        'totaltime': p._source.totaltime
                    })
                })
               return obj
        })
    }

    insertMusic(user_id, playListId, music){
        return this.getPlaylistById(user_id, playListId)
        .then(playlist => {
  
            let found = false
            //verificar se a musica já existe antes de fazer push
            playlist.musics.forEach(m => {
                if(m.artist == music.artist && m.name == music.name){
                   found = true
                }
            })

            if(!found){
             //atualizar o tempot total da playlist!
            playlist.totaltime += parseInt(music.duration)
            playlist.musics.push(music)
           
            const options = {
                'method': 'PUT',
                'uri': `${this.playlist}/${playListId}`,
                'json': true,
                'body': playlist
            }
            return options
            }

            else{
                 throw { statusCode: 409, message: 'Esta musica já se encontra na playlist' } 
            }
           
        })
        .then(options=> {
            return rp(options)
            .then(
                body => {
                    console.log('MUSICA A INSERIR' +JSON.stringify(body))
                  return  body
                }
            )
        })
        
        
    }

    deleteMusic(user_id, playlistId, artist, track){
       return this.getPlaylistById(user_id, playlistId)
        .then(body =>{
            console.log(JSON.stringify(body))
            let a = playlist.musics[artist]
            let t = playlist.musics[track]

            if(a  == null || t == null) {
                throw {statusCode: 404, message: "O nome do artista ou da musica podem estar incorrectos"}
            }
            
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