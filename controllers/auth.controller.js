const Usuario = require('../model/usuariosModel');
const jwt = require('jsonwebtoken');
let aes256 = require('aes256');
const key = 'CLAVEDIFICIL';
/*
    401 -> no autorizado
    403 -> No tiene permisos suficientes
    404 -> not found
    400 -> Enviaste algo que no era o bad request
    500 -> Exploto el servidor
    200 -> Ok
*/

const singIn = async (request, response) => {
    try{
        const usuario = await Usuario.findOne({email: args.usuario})
        if(!usuario){
            return"Credenciales invalidas"
        }
        
        const claveDesencriptada = aes256.decrypt(key, usuario.password)
        if(args.clave != claveDesencriptada){
            return "Credenciales invalidas"
        }


        //Firma del token
        const token = jwt.sign({ 
            role: usuario.role
        }, key, {expiresIn: 60 * 60 * 2})
        //Entrega del token luego del logueo exitoso
        return token
    }catch(error){
        console.log(error)
        response.status(500).json({response:"Contacte al admin"})
    }

}

module.exports = singIn;