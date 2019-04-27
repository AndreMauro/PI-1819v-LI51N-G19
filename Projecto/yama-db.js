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

}



  /*  // const uri= http://localhost:9200/yama/playlists/id
    editPlaylist(name, description, cb)
    {
        //TODO

        const options = {
            'uri': `${this.playlistUrl}/${id}`,
            'json': true,
            'body': data
        }

        request.put(options, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb))
                cb(null, body)
        })

    }*/

 function reportError(statusOk, err, res, body, cb) {
        if(err) {
            cb(err)
            return true
        }
        if(res.statusCode != statusOk) {
            cb({
                code: res.statusCode,
                message: res.statusMessage,
                error: body
            })
            return true
        }
    }

    module.exports = YamaDB