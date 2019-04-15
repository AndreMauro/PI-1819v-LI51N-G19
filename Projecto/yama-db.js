const request = require('request')

class YamaDB {

    construtor(es){
        this.yamaUrl = `http://${es.host}:${es.port}/${es.yama_index}`
        this.playlist = `http://${es.host}:${es.port}/${es.yama_index}/playlist`
    }

    static init(es){
        return new YamaDB(es)
    }
     
    //
    createPlaylist(name, description, cb){
        const options = {
            'uri': `${this.playlistUrl}`,
            'json': true,
            'body': {'name': name,
                    'descripton': descripton,
                    'musics': [] 
                }
        }
        request.post(options, (err, res, body, cb) =>{
            if(!reportError(201, err, res, body, cb)){
                cb(null,{"id":body._id}) 
        }
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