const { User } = require('../models')
const passport = require('../lib/passport')

module.exports = {
    register: (req, res, next) => {
        User.register(req.body)
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err => next(err))
    },

    login: passport.authenticate('local', {
        successRedirect: '/whoami',
        failureRedirect: '/login',
        failureFlash: true //untuk mengaktifkan flash
    }),

    whoami: (req, res) => {
        // req.user adalah instance dari User Model, hasil authentikasi dari passport
        res.render('profile', req.user.dataValues)
    }
}