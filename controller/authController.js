const { User } = require('../models')
const passport = require('passport')

module.exports = {
    register: (req, res, next) =>{
        User.register(req.body)
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err => next(err))
    }
}

// module.exports = {
//     create: (req, res) => {
//         const { username, password } = req.body
//         User.create({
//             username: username,
//             password: password
//         })
//         .then(()=> res.redirect("/users"))
//         .catch(err => res.send(`Failed - ${JSON.stringify(err.message)}`))
//     },
//     index: (req, res)=> {
//         Book.findAll()
//         .then(result => res.render("user/index", {username: "Users", users: result}))
//     }
// }