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
		const artisName = 'Drake'
		const albumName = 'Take care'
		fetch(`http://localhost:3000/yama/artist/${artisName}/Album/${albumName}`)
			.then(res =>{
			const x =	res.json()
			alert(JSON.stringify(x))
			return x
			}  )
			.then(album => albumDetail.innerHTML = setAlbum(album.tracks))
			.catch(err => console.log(err))
	}
   function setAlbum(tracks) {
        return albumView({tracks})
	}

}