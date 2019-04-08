'use strict'

class Yama {

    static init() {
        return new Yama()
    }

    getAlbums(id, cb) {
        const returnedAlbums = albums[id]
        if (!returnedAlbums) {
            cb({ code: 404 })
        } else {
            cb(null, returnedAlbums)
        }
    }
}

//Este objeto tem que conter a mesma organização e informação que tem o 
//objeto trazido pelo pedido a web api last.fm
const albums = { 
    'Eminem': {
        'albums': {
            'Kamikaze': {
                id: '35456',
                title: 'Kamikaze',
                year: '2018'
            },
            'Revival': {
                id: '86253',
                title: 'Revival',
                year: '2017'
            }
        }
    },
    'AndreMauroVidaLOKA': {
        'albums': {}
    }
}

module.exports = Yama