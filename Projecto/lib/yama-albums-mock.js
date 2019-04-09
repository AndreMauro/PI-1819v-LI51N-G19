'use strict'


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

module.exports = albums