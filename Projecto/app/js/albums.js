'use strict'
const util = require('./util.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const albumsHBS = require('./../views/albumsView.hbs')
const albumsHTML = require('./../views/albums.html')

module.exports = (divMain, artist) => {
	
	divMain.innerHTML = albumsHTML
	
	const albumsList = document.getElementById('albumsList')
	const albumsView = Handlebars.compile(albumsHBS)

	fetch(`http://localhost:3000/yama/artist/${artist}/Albums`)
		.then(res => res.json())
		.then(albums =>{
			alert(JSON.stringify(albums))
			albumsList.innerHTML = setAlbums(albums) 
		})
		.catch(err => console.log(err))
	
   function setAlbums(albums) {
        return albumsView({albums})
    }
}