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
		
	const divSearchResults = document.getElementById('divSearchResults')
	const searchResultsView = Handlebars.compile(artistsHBS)

	function searchHandler(ev){
		ev.preventDefault()
		fetch(`http://localhost:3000/yama/searchArtist/:artistName`)
			.then(res => res.json())
			.then(artists => divSearchResults.innerHTML = searchArtists(artists.competitions))
			.catch(err => console.log(err))
	}
   function searchArtists(competitions) {
        return searchResultsView({competitions})
    }
}