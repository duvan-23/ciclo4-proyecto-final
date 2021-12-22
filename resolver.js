const ProyectoModel = require('./model/proyectoModel')
const UsuarioModel = require('./model/usuariosModel')
const InscripcionesModel = require('./model/inscripcionesModel');
const inscripcionesModel = require('./model/inscripcionesModel');
const AvancesModel = require('./model/avancesModel')
let aes256 = require('aes256');
const key = 'CLAVEDIFICIL';
const {isAdmin, isLeader, isStudent} = require('./middleware/authjwt')
const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
        proyectos: async () => await ProyectoModel.find({}),
        getProyecto: async (parent, args, context, info) => await ProyectoModel.findOne({ name: args.name }),
        usuarios: async () => await UsuarioModel.find({}),
        getUsuario: async (parent, args, context, info) => await UsuarioModel.findOne({ _id: args._id }),
        inscripciones: async () => await InscripcionesModel.find({}),
        getInscripcion: async (parent, args, context, info) => await InscripcionesModel.findOne({ _id: args._id }),
        avances: async () => await AvancesModel.find({}),
        getAvances: async (parent, args, context, info) => await AvancesModel.findOne({ project_id: args.project_id }),
        inscripciones: async () => await InscripcionesModel.find({}),
        getInscripcion: async (parent, args, context, info) => await InscripcionesModel.findOne({ role: args.role })

    },
    Mutation: {
        //crear proyecto nuevo
        createProyecto: async (parent, args, context, info) => {
            //if(isLeader(context.rol)){
                const { name, generalObjective, specificObjectives, budget, startDate, endDate, leader_id} = args.Proyecto;
                const nuevoProyecto = new ProyectoModel();
                const user = await UsuarioModel.findOne({email:leader_id});
                nuevoProyecto.name = name;
                nuevoProyecto.generalObjective = generalObjective;
                nuevoProyecto.specificObjectives = specificObjectives;
                nuevoProyecto.budget = budget;
                if (startDate) { nuevoProyecto.startDate = startDate; } else { nuevoProyecto.startDate = new Date(); }
                nuevoProyecto.endDate = endDate;
                nuevoProyecto.leader_id =user.fullName;
                return nuevoProyecto.save().then(u => "Proyecto creado")    
                    .catch(err => console.log(err));
                //.catch(err => console.log("err")) si quierover cual es el error
           // }
        },
        //actualizar un campo de proyectos
        activeProyecto: (parent, args, context, info) => {
            // if(isLeader(context.rol)){
                return ProyectoModel.updateOne({ name: args.name }, { status: "ACTIVE" })
                .then(u => "Proyecto Actualizado")
                .catch(err => console.log("Fallo la Activación"));
            // }
        },
        //borrar un proyecto
        deleteProyecto: (parent, args, context, info) => {
            if(isLeader(context.rol)){
            return ProyectoModel.deleteOne({ name: args.name1 })
                .then(u => "Proyecto Eliminado")
                .catch(err => console.log("Fallo La Eliminación"));
            }
        },
        insertUserToProyecto: async(parent, args, context, info) => {
            //if(isLeader(context.rol)){
                const user = await UsuarioModel.findOne({identification:args.identification});
                const proyecto = await ProyectoModel.findOne({name: args.name});
                if(user && user.status ==="Autorizado"){
                    if(proyecto.integrantes.find(i => i ==user.fullName)){
                        return "El usuario ya pertenece al proyecto indicado"
                    }else{
                        return ProyectoModel.updateOne({ name: args.name }, { $push:{integrantes:user.fullName} })
                            .then(x=> "agregado correctamente")
                            .catch(err => console.log(err));
                    }
                }else{
                    return "Usuario no esta activo"
                }
            //}
        },
        updatePhaseProyectos: (parent, args, context, info) => {
            return ProyectoModel.updateOne({ name: args.name }, { phase: args.phase })
                .then(u => "Phase Actualizada")
                .catch(err => console.log("Falló la actualización"));
        },
        updateProyecto: (parent, args, context, info) => {
            return ProyectoModel.updateOne({_id: args._id },
                {
                    name: args.name,
                    generalObjective: args.generalObjective,
                    specificObjectives: args.specificObjectives,
                    budget: args.budget
                })
                .then(u => "Usuario actualizado")
                .catch(err => console.log(err));
        },
        // Crear usuario
        createUsuario: (parent, args, context, info) => {
            const { fullName, identification, email, password, role } = args.Usuario;
            // const encryptedPlainText = aes256.encrypt(key, password);
            const nuevoUsuario = new UsuarioModel();
            nuevoUsuario.fullName = fullName;
            nuevoUsuario.identification = identification;
            nuevoUsuario.email = email;
            nuevoUsuario.password = password;
            nuevoUsuario.role = role;
            return nuevoUsuario.save()
                .then(mensaje => "Usuario creado")
                .catch(err => console.log(err));
        },
        // Actualizar status usuario
        updateStatusUsuario: (parent, args, context, info) => {
            // if(isAdmin(context.rol)){
            return UsuarioModel.updateOne({ identification: args.identification }, { status: args.status })
                .then(u => "Status de usuario actualizado")
                .catch(err => console.log("Falló la actualización"));
            // }
        },
        updateUsuario: (parent, args, context, info) => {
            return UsuarioModel.updateOne({ _id: args._id },
                {
                    fullName: args.fullName,
                    identification: args.identification,
                    email: args.email,
                    password: args.password,
                    role: args.role,
                    status: args.status
                })
                .then(u => "Usuario actualizado")
                .catch(err => console.log(err));
        },
        // Eliminar Usuario
        deleteUsuario: (parent, args, context, info) => {
            if(isAdmin(context.rol)){
            return UsuarioModel.deleteOne({ identification: args.identification })
                .then(u => "Usuario eliminado")
                .catch(err => console.log("Falló la eliminación"));
            }
        },

        //crear inscripcion

        createInscripcion:async (parent, args, context, info) => {
            //if(isStudent(context.rol)){
                const { project_id, user_id, status, enrollmentDate, egressDate } = args.Inscripcion;
                const nuevoIncripcion = new InscripcionesModel();
                const proyect1 =  await ProyectoModel.findOne({ name: project_id });
                const user =  await UsuarioModel.findOne({ email: user_id });
                nuevoIncripcion.project_id =proyect1._id;
                nuevoIncripcion.user_id = user._id;
                nuevoIncripcion.status = status;
                nuevoIncripcion.enrollmentDate = enrollmentDate;
                nuevoIncripcion.egressDate = egressDate;
                
            // if (enrollmentDate) { nuevoIncripcion.enrollmentDate = enrollmentDate; } else { nuevoIncripcion.enrollmentDate = new Date(); }
                // nuevoIncripcion.egressDate = egressDate;
                return nuevoIncripcion.save().then(u => "Incripcion creada")
                    .catch(err => console.log("Fallo la Inscripcion"));
                //.catch(err => console.log("err")) si quierover cual es el error
           // }
        },

        // Actualizar status de incripcion
        updateStatusInscripcion: (parent, args, context, info) => {
            // if(isLeader(context.rol)){
            return inscripcionesModel.updateOne({ _id: args._id }, { status: args.status })
                .then(u => "Status de usuario actualizado")
                .catch(err => console.log("Falló la actualización"));
            // }
        },
        deleteInscripcion: (parent, args, context, info) => {
            if(isLeader(context.rol)){
            return inscripcionesModel.deleteOne({ _id: args._id })
                .then(u => "Inscripcion Eliminado")
                .catch(err => console.log("Fallo La Eliminación"));
            }
        },
        // Introducir avance
        createAvance: async (parent, args, context, info) => {
            //if(isStudent(context.rol)){
                const { project_id, addDate, description, observations } = args.Avance;
                const nuevoAvance = new AvancesModel();
                const proyect1 =  await ProyectoModel.findOne({ name: project_id });
                //console.log(proyect1.name);
                nuevoAvance.project_id = proyect1.name;
                if (addDate) { nuevoAvance.addDate = addDate; } else { nuevoAvance.addDate = new Date(); }
                nuevoAvance.description = description;
                nuevoAvance.observations = observations;
                return nuevoAvance.save()
                    .then(mensaje => "Avance creado correctamente")
                    .catch(err => console.log(err));
           // }
        },
        //Actualizar descripción de avances
        updateAvance: (parent, args, context, info) => {
            //if(isStudent(context.rol)){
                return AvancesModel.updateOne({ project_id: args.project_id}, { description: args.description, observations:args.observations})
                    .then(u => "Avance Actualizado")
                    .catch(err => console.log("Error"));
            //}
        },
        //Actualizar observaciones de avances
        updateObservations: (parent, args, context, info) => {
            // if(isLeader(context.rol)){
                return AvancesModel.updateOne({ observations: args.observations }, { status: args.observations } )
                    .then(u => "Observación Actualizada")
                    .catch(err => console.log("Error"));
            // }
        },
        //Borrar un avance
        deleteAvance: (parent, args, context, info) => {
            // if(isStudent(context.rol)){
                return AvancesModel.deleteOne({ project_id: args.proyecto1})
                    .then(u => "Avance Eliminado")
                    .catch(err => console.log("Fallo La Eliminación"));
            // }
        },

        //Borrar una observación
        deleteObservation: (parent, args, context, info) => {
            if(isLeader(context.rol)){
                return AvancesModel.deleteOne({ observations: args.observation1 })
                    .then(u => "Obervación Eliminada")
                    .catch(err => console.log("Fallo La Eliminación"));
            }
        },


        
        //crear inscripcion

        createInscripcion:async (parent, args, context, info) => {
            const { project_id, user_id,enrollmentDate, egressDate,role } = args.Inscripcion;
            const nuevoIncripcion = new InscripcionesModel();
            const proyect1 =  await ProyectoModel.findOne({ name: project_id });
            const user =  await UsuarioModel.findOne({ email: user_id });
            nuevoIncripcion.project_id =proyect1.name;
            nuevoIncripcion.user_id = user.fullName;
            nuevoIncripcion.role = user.role;
            nuevoIncripcion.enrollmentDate = enrollmentDate;
            nuevoIncripcion.egressDate = egressDate;
            
           // if (enrollmentDate) { nuevoIncripcion.enrollmentDate = enrollmentDate; } else { nuevoIncripcion.enrollmentDate = new Date(); }
            // nuevoIncripcion.egressDate = egressDate;
            return nuevoIncripcion.save().then(u => "Incripcion creada")
                .catch(err => console.log("Fallo la Inscripcion"));
            //.catch(err => console.log("err")) si quierover cual es el error
        },
        ///////////

        // Actualizar status de incripcion
        updateStatusInscripcion: (parent, args, context, info) => {
            return inscripcionesModel.updateOne({user_id: args.user_id }, { status: args.status })
                .then(u => "Status de usuario actualizado")
                .catch(err => console.log("Falló la actualización"));
        },


        deleteInscripcion: (parent, args, context, info) => {
            return inscripcionesModel.deleteOne({ _id: args._id })
                .then(u => "Inscripcion Eliminado")
                .catch(err => console.log("Fallo La Eliminación"));
        },


        autenticar: async(parent, args, context, info) => {
            try {
                const usuario = await UsuarioModel.findOne({ email: args.usuario })
                const claveDesencriptada = aes256.decrypt(key, usuario.password)
                
                if (!usuario) {
                    return  "Verique usuario y contrasena" 
                }

                
                if (args.clave != claveDesencriptada) {
                    return "Verique usuario y contrasena"
                }

                const token = jwt.sign({
                    rol: usuario.perfil
                }, key, { expiresIn: 60 * 60 * 2 })

                return token 
            } catch (error) {
                console.log(error)
            }
        }


    }
}
module.exports = resolvers