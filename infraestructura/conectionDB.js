const mongoose = require('mongoose')
const urlDB='mongodb+srv://duvan:735843.@cluster0.kench.mongodb.net/proyecto_ciclo4?retryWrites=true&w=majority';
mongoose.connect(urlDB);

const mongoDB = mongoose.connection;
mongoDB.on('open', _ =>{
    console.log("conectado a la bd");
});