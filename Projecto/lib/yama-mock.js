'use strict'

class Yama {

    static init() {
        return new Yama()
    }

    get(id, cb) {
        const returnedAlbums = albums[id]
        if (!returnedAlbums) {
            cb({ code: 404 })
        } else {
            cb(null, returnedAlbums)
        }
    }
}
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