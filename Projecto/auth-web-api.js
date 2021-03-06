'use strict'

const passport = require('passport')
const auth = require('./lib/auth.js')

const es = {
    host: 'localhost',
    port: '9200',
}
const authService = auth.init(es)

module.exports = (app) => {
    
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((userId, done) => authService
        .getUser(userId)
        .then(user => done(null, user))
        .catch(err => done(err))
    )
    app.use(passport.initialize())
    app.use(passport.session())

    app.get('/yama/auth/session', getSession)
    app.post('/yama/auth/login', login)
    app.post('/yama/auth/logout', logout)
    app.post('/yama/auth/signup', signup)

    function getSession(req, resp, next) {
        console.log('isAutenticated?' + req.isAuthenticated())
        const fullname = req.isAuthenticated() ? req.user.fullname : undefined
        resp.json({
            'auth': req.isAuthenticated(),
            'fullname': fullname
        })
    }

    function login(req, resp, next) {
        authService
            .authenticate(req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if(err) next(err)
                    else resp.json(user)
                })
            })
            .catch(err => next(err))
    }
    function logout(req, res, next) {
            req.logOut() 
            res.clearCookie('connect.sid')
            res.redirect('/#home')
    }
    function signup(req, resp, next) {
        authService
            .createUser(req.body.fullname, req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if(err) next(err)
                    else resp.json(user)
                })
            })
            .catch(err => next(err))
    }
}