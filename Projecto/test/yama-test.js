'use strict'
const expect = require('chai').expect
const assert = require('chai').assert
const should = require('chai').should()
const yama = require('../lib/yama-mock.js')
//const yama = require('../lib/yama-services')

describe('test yama', () => {
  const es = {
    host: 'localhost',
    port: '9200',
    yama_index: 'playlists',
    lastfm_api: 'http://ws.audioscrobbler.com/2.0/?method=',
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
    yamaInit.getArtist('Pink', (err, data) => {
      should.exist(data)
      expect(data[1])
        .to
        .be
        .an('object')
        .and.have.a.property('name', 'Pink')
      done()
    })
  })

  it('Fourth artistName should be Pink Floyd', done => {
    const yamaInit = yama.init(es)
    yamaInit.getArtist('Pink Floyd', (err, data) => {
      should.exist(data)
      expect(data[0])
        .to
        .be
        .an('object')
        .and.have.a.property('name', 'Pink Floyd')
      done()
    })
  })


  //#endregion getArtist


  //#region getAlbumsDetails
  it('Should get a detail info of an album called Feedback from Djodje ', done => {
    const yamaInit = yama.init(es)
    yamaInit.getAlbumsDetails('Djodje', 'Feedback', (err, album) => {
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
    yamaInit.getAlbumsDetails('Djodje', 'Feedback', (err, album) => {
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
  it('Should get the 3 top albums for Eminem', done => {
    const yamaInit = yama.init(es)
    yamaInit.getAlbums('Eminem', (err, album) => {
      should.exist(album)
      expect(album)
        .to
        .be
        .an('Array')
      done()
    })
  })

  it('The first returned album for Eminem should be Recovery', done => {
    const yamaInit = yama.init(es)
    yamaInit.getAlbums('Eminem', (err, album) => {
      should.exist(album)
      expect(album[0])
        .to
        .be
        .an('Object')
        .and.have.a.property('Name', 'Recovery')
      done()
    })
  })

  it('The second returned album for Eminem should be The Eminem Show', done => {
    const yamaInit = yama.init(es)
    yamaInit.getAlbums('Eminem', (err, album) => {
      should.exist(album)
      expect(album[1])
        .to
        .be
        .an('object')
        .and.have.a.property('Name', 'The Eminem Show')
      done()
    })
  })

  it('Should get the 3 top albums for U2', done => {
    const yamaInit = yama.init(es)
    yamaInit.getAlbums('U2', (err, album) => {
      should.exist(album)
      expect(album)
        .to
        .be
        .an('Array')
      done()
    })
  })

  it('The first returned album for U2 should be All That You Can\'t Leave Behind', done => {
    const yamaInit = yama.init(es)
    yamaInit.getAlbums('U2', (err, album) => {
      should.exist(album)
      expect(album[0])
        .to
        .be
        .an('object')
        .and.have.a.property('Name', 'All That You Can\'t Leave Behind')
      done()
    })
  })

  it('The second returned album for U2 should be Achtung Baby', done => {
    const yamaInit = yama.init(es)
    yamaInit.getAlbums('U2', (err, album) => {
      should.exist(album)
      expect(album[1])
        .to
        .be
        .an('object')
        .and.have.a.property('Name', 'Achtung Baby')
      done()
    })
  })
  //#endregion

  //#region createPlaylist
  it('Should create one playlist with name The best of Eminem', done => {
    const yamaInit = yama.init(es)
    yamaInit.createPlaylist('The best of Eminem', 'The greatest musics', (err, playlistId) => {
      should.exist(playlistId)
      expect(playlistId)
        .to
        .be
        .a('Number')
        .equal(1)
      done()
    })
  })

  it('Should create one playlist with name Top Portugal', done => {
    const yamaInit = yama.init(es)
    yamaInit.createPlaylist('Top Portugal', 'The top musics of Portugal', (err, playlistId) => {
      should.exist(playlistId)
      expect(playlistId)
        .to
        .be
        .a('Number')
        .equal(2)
      done()
    })
  })
  //#endregion

  //#region editPlaylist
  it('Should edit the description of The best of Eminem playlist', done => {
    const yamaInit = yama.init(es)
    yamaInit.editPlaylist(1, 'The best of Eminem', 'The greatest musics of all time', (err, playlist) => {
      should.exist(playlist)
      expect(playlist)
        .to
        .be
        .an('object')
        .and.have.a.property('description', 'The greatest musics of all time')
      done()
    })
  })

  it('Should rename the Top Portugal playlist', done => {
    const yamaInit = yama.init(es)
    yamaInit.editPlaylist(2, 'Top Portugal 2019', 'The top musics of Portugal', (err, playlist) => {
      should.exist(playlist)
      expect(playlist)
        .to
        .be
        .an('object')
        .and.have.a.property('name', 'Top Portugal 2019')
      done()
    })
  })
  //#endregion

  //#region getPlaylists
  it('Should edit the description of The best of Eminem playlist', done => {
    const yamaInit = yama.init(es)
    yamaInit.getPlaylists((err, playlists) => {
      should.exist(playlists)
      expect(playlists)
        .to
        .be
        .an('Array')
        .length(2)
      done()
    })
  })
  //#endregion

  //#region addMusic
  it('Should add one music to the playlist with id 1', done => {
    const yamaInit = yama.init(es)
    const music = {
      'name': 'some name',
      'artist': 'some artist',
      'duration': 267
    }
    yamaInit.addMusic(1, music, (err, musics) => {
      should.exist(musics)
      expect(musics)
        .to
        .be
        .an('Array')
        .length(1)
      done()
    })
  })
  //#endregion

  //#region removeMusic
  it('Should add one music to the playlist with id 1', done => {
    const yamaInit = yama.init(es)
    const music = {
      'name': 'some name',
      'artist': 'some artist',
      'duration': 267
    }
    yamaInit.removeMusic(1, music, (err, musics) => {
      should.exist(musics)
      expect(musics)
        .to
        .be
        .an('Array')
        .length(0)
      done()
    })
  })
  //#endregion
})
