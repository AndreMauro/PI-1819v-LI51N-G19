'use strict'
const util = require('./util.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const albumHBS = require('./../views/albumView.hbs')
const albumHTML = require('./../views/album.html')

module.exports = (divMain) => {
	
    divMain.innerHTML = albumHTML
	document
		.getElementById('buttonSearch')
		.addEventListener('click', getAlbum)
		
	const albumDetail = document.getElementById('albumDetail')
	const albumView = Handlebars.compile(albumHBS)

	function getAlbum(ev){
		ev.preventDefault()
		fetch(`http://localhost:3000/yama/artist/Eminem/Album/Recovery`)
			.then(res => res.json())
			.then(album => albumDetail.innerHTML = setAlbum(album))
			.catch(err => console.log(err))
	}
   function setAlbum(album) {
        return albumView({album})
    }
}