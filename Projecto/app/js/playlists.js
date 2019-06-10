'use strict'

const util = require('./util.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const playlistHBS = require('./../views/playlist.hbs')
const playlistHTML = require('./../views/playlist.html')

module.exports =  async (divMain) => {
	 
	 try{
        const session = await util.fetchJSON('/yama/auth/session')
        if(!session.auth){
			divMain.innerHTML = ''
			return util.showAlert('You cannot access Playlists! Only for authenticated users.')
			}
    }
    catch(err){
        util.showAlert(JSON.stringify(err))
    }

    divMain.innerHTML = playlistHTML

    document //Search function eventListener
    .getElementById('buttonSearch')
    .addEventListener('click', searchHandler)

    document //createPlaylist function eventListener
		.getElementById('buttonCreatePlaylist')
		.addEventListener('click', createPlaylistHandler)
	
	document //editPlaylist function eventListener
		.getElementById('buttonEditPlaylist')
        .addEventListener('click', editPlaylistHandler)
        
    const divSearchResults = document.getElementById('divSearchResults')
    const searchResultsView = Handlebars.compile(playlistHBS)


	const playlistName = document.getElementById('playlistName')
    const playlistDescription = document.getElementById('playlistDescription')
    
    function createPlaylistHandler(ev){
		ev.preventDefault()
		if(!playlistName.value ||  !playlistDescription.value){
			util.showAlert('Preencha os campos Name e Description')
		}
		else{
            options = {
                method: 'POST',
                body: {
                        name: playlistName,
                        description: playlistDescription
                      }

            }
			fetch(`http://localhost:3000/yama/playlists`, options)
			.then(res => {
				return (res.status == 409)? util.showAlert('O grupo que esta a tentar criar já existe!')
				 : res.json()
			})
			.then(obj => {
				fetch(`http://localhost:3000/yama/playlist/${playlistId}`)
				.then(ress=> ress.json())
				.then( objj => divSearchResults.innerHTML = showGroupInfo(objj)
				)})
			.catch()
		}
    }
    
    function showAllGroupInfo(groups){
        const headers = '<table class="table"><thead><tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Musicas</th></tr></thead><tbody>'
        let data = ''
        groups.forEach(element => {
         data+=searchResultsView({element})
     })
        return headers + data + '</tbody></table>'
    }
 
    function showGroupInfo(group){
     const headers = '<table class="table"><thead><tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Musicas</th></tr></thead><tbody>'
     return headers + searchResultsView({group}) + '</tbody></table>'
    }

}