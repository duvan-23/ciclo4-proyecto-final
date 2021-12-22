require('./infraestructura/conectionDB')
const typeDefs = require('./typeDef')
const resolvers = require('./resolver')
//mm
const express = require('express')
const  authRoute = require('./routes/auth.routes')
const {validarToken, admin} = require('./middleware/authjwt')
const jwt = require('jsonwebtoken');
const key = 'CLAVEDIFICIL';

const {ApolloServer} = require('apollo-server-express')

const iniciarServidor =async()=>{
    const api = express();
    const apollo= new ApolloServer(
        {
            typeDefs,
            resolvers
        });
    await apollo.start()
    apollo.applyMiddleware({app:api,path:'/consulta'})
    api.use(express.json())
    api.use('/api', authRoute)
    api.get('/api/dashboard', [validarToken, admin], (request, response)=>{
        response.json("Soy el dashboard");
    })
    api.listen('9091',()=>console.log('Inicio Server'))
}
iniciarServidor()




