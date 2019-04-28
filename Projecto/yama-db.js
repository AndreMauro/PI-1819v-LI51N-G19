const request = require('request')

class YamaDB {

    constructor(es){
        this.yamaUrl = `http://${es.host}:${es.port}/${es.yama_index}`
        this.playlist = `http://${es.host}:${es.port}/${es.yama_index}/playlist`
    }

    static init(es){
        return new YamaDB(es)
    }
     
    //
    createPlaylist(name, description, cb){
        const options = {
            'uri': `${this.playlist}`,
            'json': true,
            'body': {'name': name,
                    'description': description,
                    'musics': [] 
                }
        }
        request.post(options, (err, res, body) =>{
            if(!reportError(201, err, res, body, cb)){
                cb(null,{"id":body._id}) 
            }
         })
    }
    
    getPlaylistById(id,cb){
        const uri = `${this.playlist}/${id}`
        request.get(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb)){
                body = JSON.parse(body)   
                let playlist = {}         
                playlist.id = body._id
                playlist.name = body._source.name
                playlist.description = body._source.description
                playlist.musics = body._source.musics
                 
                cb(null, playlist)
            }
        })
    }

    editPlaylist(id,name, description, cb){
       this.getPlaylistById(id,(err, playlist) => {  
			
        playlist.name=name
        playlist.description=description

        const options = {
            'uri': `${this.playlist}/${id}`,
            'json': true,
            'body': playlist
        }
        
        request.put(options, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb))
                cb(null, body)
            })
        })  
    }

    getPlaylists(cb){       
        const uri = `${this.playlist}/_search`
        request.get(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb)){
                body = JSON.parse(body)
                body = body.hits.hits
                let obj = {'playlists':[]}  // passing groups array to be consistent
                body.forEach(p => {
                    obj.playlists.push({
                        'id':p._id,
                        'name': p._source.name,
                        'description':p._source.description,
                        'musics': p._source.musics
                    })
                })
                cb(null, obj)
            }
            cb(err) 
         })
    }

    insertMusic(playListId, music, cb){
        this.getPlaylistById(playListId, (err, playlist)=>{

            if(err) cb(err)  //TODO throwing some erros when doesnt found the playlist
            playlist.musics.push(music)
           
            const options = {
                'uri': `${this.playlist}/${playListId}`,
                'json': true,
                'body': playlist
            }

            request.put(options, (err, res, body) =>{
                if(!reportError(200, err, res, body, cb))
                    cb(null, playlist) //should show the playList with the inserted music
            })
        })
    }

    deleteMusic(playlistId, artist, track, cb){
        this.getPlaylistById(playlistId, (err, playlist)=>{

            if(err) cb(err)  //TODO throwing some erros when doesnt found the playlist
            playlist.musics =  playlist.musics.filter( m => m.name != track && m.artist != artist)
            
            const options = {
                'uri': `${this.playlist}/${playlistId}`,
                'json': true,
                'body': playlist
            }

            request.put(options, (err, res, body) =>{
                if(!reportError(200, err, res, body, cb))
                    cb(null, body) //should show the playList with the inserted music
            })
        })
    }

}


 function reportError(statusOk, err, res, body, cb) {
        if(err) {
            cb(err)
            return true
        }
        if(res.statusCode != statusOk) {
            cb({
                statusCode: res.statusCode,
                message: res.statusMessage,
                error: body
            })
            return true
        }
    }

    module.exports = YamaDB