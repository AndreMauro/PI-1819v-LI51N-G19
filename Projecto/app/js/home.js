'use strict'

const homeHTML = require('./../views/home.html')

module.exports = (divMain) => {
    divMain.innerHTML = homeHTML
}