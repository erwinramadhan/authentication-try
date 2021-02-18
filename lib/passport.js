const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models')

async function authenticate(username, password, done){
    try{
        const user = await User.authenticate({ username, password})
        return done(null, user)
    }
    catch(err){
        return done(null, false, { message: err.message })
    }
}

passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticate)
)

// Serialize Deserialize
// Cara untuk membuat sesi dan menghapus sesi
passport.serializeUser(
    (user, done) => done(null, user.id)
)

passport.deserializeUser(
    async (id, done) => done(null, await User.findByPk(id))
)

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport