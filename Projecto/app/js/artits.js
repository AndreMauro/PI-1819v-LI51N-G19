'use strict'
const util = require('./util.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const artistsHBS = require('./../views/artistView.hbs')
const artistHTML = require('./../views/artists.html')

module.exports = (divMain) => {
	
    divMain.innerHTML = artistHTML
	document
		.getElementById('buttonSearch')
        .addEventListener('click', searchHandler)
        
    const artistName = document.getElementById('artistName')
	const divSearchResults = document.getElementById('divSearchResults')
	const searchResultsView = Handlebars.compile(artistsHBS)

	function searchHandler(ev){
        ev.preventDefault()
        if(!artistName.value){
            util.showAlert('por favor introduza o nome de um artista')
            }
        const artist = artistName.value
		fetch(`http://localhost:3000/yama/searchArtist/${artist}`)
			.then(res => res.json())
			.then(artists => divSearchResults.innerHTML = searchArtists(artists))
			.catch(err => console.log(err))
	}
   function searchArtists(artists) {
       alert(artist)
       console.log(JSON.stringify(artist))
        return searchResultsView({artists})
    }
}