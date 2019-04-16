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

    //#region getArtist
    it('Should get artist Pink', done => {
        const yamaInit = yama.init(es)
      yamaInit.getArtist('Pink', (err, data) =>{
        should.exist(data)
        expect(data[1])
        .to
        .be
        .an('object')
        .and.have.a.property('name', 'Pink')
        done()  
      } )
    })

    it('Fourth artistName should be Pink Floyd', done => {
      const yamaInit = yama.init(es)
      yamaInit.getArtist('Pink Floyd', (err, data) =>{
        should.exist(data)
        expect(data[0])
        .to
        .be
        .an('object')
        .and.have.a.property('name', 'Pink Floyd')
        done()
      } )
    })

    
    //#endregion getArtist
    

    //#region getAlbumsDetails
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
      //#endregion getAlbumsDetails
      
    //#region  getAlbums
    it('The first returned album for Eminem should be Recovery', done => {
      const yamaInit = yama.init(es)
      yamaInit.getAlbums('Eminem', (err, albums) =>{
          should.exist(albums)
          expect(albums[0])
          .to
          .be
          .an('Object')
          .and.have.a.property('Name', 'Recovery')
          done()
      }) 
    })

    it('The second returned album for Eminem should be The Eminem Show', done => {
      const yamaInit = yama.init(es)
      yamaInit.getAlbums('Eminem', (err, albums) =>{
          should.exist(albums)
          expect(albums[1])
          .to
          .be
          .an('Object')
          .and.have.a.property('Name', 'The Eminem Show')
          done()
      }) 
    })

    it('The first returned album for U2 should be All That You Can\'t Leave Behind', done => {
      const yamaInit = yama.init(es)
      yamaInit.getAlbums('U2', (err, albums) =>{
          should.exist(albums)
          expect(albums[0])
          .to
          .be
          .an('Object')
          .and.have.a.property('Name', 'All That You Can\'t Leave Behind')
          done()
      }) 
    })

    it('The second returned album for U2 should be Achtung Baby', done => {
      const yamaInit = yama.init(es)
      yamaInit.getAlbums('U2', (err, albums) =>{
          should.exist(albums)
          expect(albums[1])
          .to
          .be
          .an('Object')
          .and.have.a.property('Name', 'Achtung Baby')
          done()
      }) 
    })
      //#endregion
})
 