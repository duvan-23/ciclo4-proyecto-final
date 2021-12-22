const { Router } = require('express')
const singIn = require('../controllers/auth.controller')


const route = Router();

route.use((request,response,next) => {
   // response.header()
   next()
})

route.post('/login', singIn)

module.exports = route