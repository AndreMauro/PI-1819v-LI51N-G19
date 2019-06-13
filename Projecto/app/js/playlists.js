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
		
	
	document //insertMusic function eventListener
		.getElementById('buttonInsertMusic')
		.addEventListener('click', insertMusicHandler)
	
	document //deleteMusic function eventListener
		.getElementById('buttonDeleteMusic')
		.addEventListener('click', deleteMusicHandler)
			
    const divSearchResults = document.getElementById('divSearchResults')
    const searchResultsView = Handlebars.compile(playlistHBS)

	const playlistId = document.getElementById('playlistId')
	const playlistName = document.getElementById('playlistName')
	const playlistDescription = document.getElementById('playlistDescription')
	const artist = document.getElementById('artistName')
	const track = document.getElementById('track')
	

    function createPlaylistHandler(ev){
		ev.preventDefault()
		if(!playlistName.value ||  !playlistDescription.value){
			util.showAlert('Preencha os campos Name e Description')
		}
		else{
			let reqBody = {
				name: playlistName.value,
                description: playlistDescription.value
			  }
		  
            const options = {
                method: 'POST',
				body: JSON.stringify(reqBody),
				headers: {
					"Content-Type": "application/json"
				}
            }

			fetch(`http://localhost:3000/yama/playlists`, options)
			.then(res => {
				return (res.status == 409)? util.showAlert('O grupo que esta a tentar criar já existe!')
				 : res.json()
			})
			.then(obj => {
				fetch(`http://localhost:3000/yama/playlists/${obj.id}`)
				.then(ress=> ress.json())
				.then( objj => divSearchResults.innerHTML = showPlaylist(objj)
				)})
				.catch(err => console.log(err))
		}
	}
	
    function editPlaylistHandler(ev){
		ev.preventDefault()

		let reqBody = {
			name: playlistName.value,
			description: playlistDescription.value
		  }
	  
		const options = {
			method: 'PUT',
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json"
			}
		}
		if(!playlistId.value || !playlistName.value ||  !playlistDescription.value){
			util.showAlert('Preencha os campos playlistId, name e Description')
		}
		else{
			fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`, options)
			.then(res => {
				return (res.status == 409)? util.showAlert('Já existem uma playlist com este nome!')
				 : res.json()
			})
			.then(obj => {
				fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`)
				.then(res => res.json())
				.then(obj => {
					if(obj == null) util.showAlert('não existe a playlist especificado')
					divSearchResults.innerHTML = showPlaylist(obj)
				})
				.catch(err => console.log(err))})
			.catch()
		}
	}

	function insertMusicHandler(ev){
		ev.preventDefault()

		let reqBody = {
			artist: artist.value,
			track: track.value
		  }
	  
		const options = {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json"
			}
		}
		if(!playlistId.value || !artist.value ||  !track.value){
			util.showAlert('Preencha os campos playlistId, artist e track')
		}
		else{
			fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`, options)
			.then(res => {
				return (res.status == 409)? util.showAlert('Já existe esta musica na playlist')
				 : res.json()
			})
			.then(obj => {
				fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`)
				.then(res => res.json())
				.then(obj => {
					if(obj == null) util.showAlert('não existe a playlist especificado')
					divSearchResults.innerHTML = showPlaylist(obj)
				})
				.catch(err => console.log(err))})
			.catch()
		}
	}

	function deleteMusicHandler(ev){
		ev.preventDefault()

		let reqBody = {
			artist: artist.value,
			track: track.value
		  }
	  
		const options = {
			method: 'DELETE',
		}
		if(!playlistId.value || !artist.value ||  !track.value){
			util.showAlert('Preencha os campos playlistId, artist e track')
		}
		else{
			fetch(`http://localhost:3000/yama/playlists/${playlistId.value}?artist=${artist.value}&track=${track.value}`, options)
			.then(res => {
				return (res.status == 409)? util.showAlert('Já existe esta musica na playlist')
				 : res.json()
			})
			.then(obj => {
				fetch(`http://localhost:3000/yama/playlists/${playlistId.value}`)
				.then(res => res.json())
				.then(obj => {
					if(obj == null) util.showAlert('não existe a playlist especificado')
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
				if(obj == null) util.showAlert('não existe a playlist')
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