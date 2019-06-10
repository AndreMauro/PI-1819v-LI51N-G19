'use strict'
const util = require('./util.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const albumsHBS = require('./../views/albumsView.hbs')
const albumsHTML = require('./../views/albums.html')

module.exports = (divMain) => {
	
    divMain.innerHTML = albumsHTML
	document
		.getElementById('buttonSearch')
		.addEventListener('click', getAlbums)
	const albumsList = document.getElementById('albumsList')
	const albumsView = Handlebars.compile(albumsHBS)

	const artistName = document.getElementById('artistName')

	function getAlbums(ev){
		ev.preventDefault()

		if(!artistName.value){
            util.showAlert('por favor introduza o nome de um artista')
            }
        const artist = artistName.value
		fetch(`http://localhost:3000/yama/artist/${artist}/Albums`)
			.then(res => res.json())
			.then(albums => albumsList.innerHTML = setAlbums(albums))
			.catch(err => console.log(err))
	}
   function setAlbums(albums) {
        return albumsView({albums})
    }
}