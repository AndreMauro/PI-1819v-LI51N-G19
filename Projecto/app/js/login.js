'use strict'

const util = require('./util.js')
const loginView = require('./../views/login.html')

module.exports = (divMain, getAuthAndInsertNavbar) => {
    divMain.innerHTML = loginView

    const txtFullname = document.getElementById('inputFullname')
    const txtPassword = document.getElementById('inputPassword')
    const txtUsername = document.getElementById('inputUsername')

    document
        .getElementById('buttonSignup')
        .addEventListener('click', signupHandler)
    document
        .getElementById('buttonLogin')
        .addEventListener('click', loginHandler)

 

    function signupHandler(ev) {
        ev.preventDefault()
        const url = 'http://localhost:3000/yama/auth/signup'
        const options = {
            method: 'POST',
            body: JSON.stringify({
                'fullname': txtFullname.value,
                'username': txtUsername.value,
                'password': txtPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
            .then(() => {
                window.location.hash = '#home'
                getAuthAndInsertNavbar()
            })
            .catch(err => util.showAlert(err, 'danger'))
    }
    async function loginHandler(ev) {
        ev.preventDefault()
        const url = 'http://localhost:3000/yama/auth/login'
        const options = {
            method: 'POST',
            body: JSON.stringify({
                'username': txtUsername.value,
                'password': txtPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const resp = await fetch(url, options)
        try{
            if(resp.status == 200){
                window.location.hash = '#home'
                getAuthAndInsertNavbar()
            } else {
                const body = await resp.json()
                util.showAlert(`${resp.status} ${resp.statusText}: ${JSON.stringify(body)}`)
            }    
        } catch(err){
            util.showAlert(JSON.stringify(err))
        }
    }


}