'use strict'
const expect = require('chai').expect
const assert = require('chai').assert
const should = require('chai').should()
//const yama = require('../lib/yama-mock.js')
const yama = require('../lib/yama-services')

describe('test yama', () => {
    const es = {
        host: 'localhost',
        port: '9200',
        yama_index: 'playlists',
        lastfm_api:'http://ws.audioscrobbler.com/2.0/?method=', 
        apiKey: 'b77a32de4783768b503960440aa1740e' 
    }
   
    it('Should initialize a Yama object', done => {
        const yamaInit = yama.init(es)
        expect(yamaInit)
            .to.be.an('object')
        done()
    })

    it('Should get a detail info of an album called Feedback from Djodje ', done => {
        const yamaInit = yama.init(es)
        yamaInit.getAlbumsDetails('Djodje', 'Feedback', (err, album) =>{
            should.exist(album)
            expect(album)
            .to
            .be
            .an('object')
            .and.have.a.property('name', 'Feedback')
            done()
        }) 
      })
      it('Last music of Feedback album from Djodje should be Um Segundo (feat. Ferro Gaita)  ', done => {
        const yamaInit = yama.init(es)
        yamaInit.getAlbumsDetails('Djodje', 'Feedback', (err, album) =>{
            should.exist(album)
            expect(album.tracks[10])
            .to
            .be
            .an('object')
            .and.have.a.property('name', 'Um Segundo (feat. Ferro Gaita)')
            done()
        }) 
      })

   /*it('should get teams by competition id', done => {
        const focaaux = foca.init(es)
        focaaux
            .getTeamsByCompetitionId('2000')
            .then( resp => {
                    should.exist(resp)
                    expect(resp)
                    .to.be.have.a.property('teams')
                    .with
                    .length(32)
                expect(resp.teams[0])
                    .to.have.a
                    .property('id', 758)
                    done()
                })
            
    })*/
})
