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

	const playlistId = document.getElementById('playlistId')
	const playlistName = document.getElementById('playlistName')
    const playlistDescription = document.getElementById('playlistDescription')
	

    function createPlaylistHandler(ev){
		ev.preventDefault()
		if(!playlistName.value ||  !playlistDescription.value){
			util.showAlert('Preencha os campos Name e Description')
		}
		else{
            const options = {
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
				fetch(`http://localhost:3000/yama/playlist/${obj.id}`)
				.then(ress=> ress.json())
				.then( objj => divSearchResults.innerHTML = showGroupInfo(objj)
				)})
			.catch()
		}
    }
    function editPlaylistHandler(ev){
		ev.preventDefault()

		if(!playlistId.value || !playlistName.value ||  !playlistDescription.value){
			util.showAlert('Preencha os campos playlistId, name e Description')
		}
		else{
			fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`, {method: 'PUT',
																	body: {name: playlistName.value, description: playlistDescription.value}})
			.then(res => {
				return (res.status == 409)? util.showAlert('Já existem um grupo com este nome!')
				 : res.json()
			})
			.then(obj => {
				fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`)
				.then(res => res.json())
				.then(obj => {
					if(obj.teams == null) util.showAlert('não existe o grupo especificado')
					divSearchResults.innerHTML = showPlaylist(obj)
				})
				.catch(err => console.log(err))})
			.catch()
		}
	}
    function searchHandler(ev){
		ev.preventDefault()
       
		if(!playlistId.value){
		fetch(`http://localhost:3000/yama/playlists/`)
			.then(res=>res.json())
			.then(playlists => {
                divSearchResults.innerHTML = showAllPlaylists(playlists.playlists)
            } )
			//	alert(JSON.stringify(obj.groups))
			.catch(err => console.log(err))
		//util.showAlert('por favor introduza um identificador do grupo')
		}
		else{

		fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`)
			.then(res => res.json())
			.then(obj => {
				if(obj.teams == null) util.showAlert('não existe o grupo especificado')
				divSearchResults.innerHTML = showPlaylist(obj)
			})
			.catch(err => console.log(err))
		}
    }
    
    function showAllPlaylists(playlists){
        const headers = '<table class="table"><thead><tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Musicas</th></tr></thead><tbody>'
        let data = ''
        playlists.forEach(element => {
         data+=searchResultsView({element})
     })
        return headers + data + '</tbody></table>'
    }
 
    function showPlaylist(playlist){
     const headers = '<table class="table"><thead><tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Musicas</th></tr></thead><tbody>'
     return headers + searchResultsView({playlist}) + '</tbody></table>'
    }

}