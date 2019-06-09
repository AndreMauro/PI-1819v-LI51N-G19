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

	function getAlbums(ev){
		ev.preventDefault()
		fetch(`http://localhost:3000/yama/artist/Eminem/Albums`)
			.then(res => res.json())
			.then(albums => albumsList.innerHTML = setAlbums(albums))
			.catch(err => console.log(err))
	}
   function setAlbums(albums) {
        return albumsView({albums})
    }
}