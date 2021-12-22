import {
    gql, useMutation
} from "@apollo/client";
import React from "react";

const MUTATION_USUARIO = gql`
        mutation creeUsuario($fullName:String, $identification:String, $email: String, $password:String, $role:String){
        createUsuario(Usuario:{fullName:$fullName, identification:$identification, email:$email, password:$password, role:$role})
    }
`;

const NuevoUsuario = () => {

    const [creadorDeUsuario] = useMutation(MUTATION_USUARIO)
    let usuario = {
        fullName: "",
        identification: "",
        email: "",
        password: "",
        role: ""
    }

    const roles = [
        { id: 1, nombre: "Administrador" },
        { id: 2, nombre: "Lider" },
        { id: 3, nombre: "Estudiante" }
    ];

    return (
        <div className="text-center justify-content-center align-items-center">
            &nbsp;
            <h1>Crear Usuario</h1>
            &nbsp;
            <form onSubmit={e => {
                e.preventDefault();
                creadorDeUsuario({
                    variables: {
                        fullName: usuario.fullName.value,
                        identification: usuario.identification.value,
                        email: usuario.email.value,
                        password: usuario.password.value,
                        role: usuario.role.value
                    }
                })
                window.location.href = '/usuarios';
            }} >
                <div>
                    <div>
                        <label>Nombre del Usuario:</label>
                        <input style={{ width: "300px" }} type="text" ref={fullName => usuario.fullName = fullName} placeholder="Nombre del Usuario" />
                    </div>
                    &nbsp;
                    <div>
                        <label>Identificación:</label>
                        <input type="text" ref={identification => usuario.identification = identification} placeholder="Identificación" />
                    </div>
                    &nbsp;
                    <div>
                        <label>Email:</label>
                        <input style={{ width: "250px" }} type="text" ref={email => usuario.email = email} placeholder="Email" />
                    </div>
                    &nbsp;
                    <div>
                        <label>Contraseña:</label>
                        <input type="password" ref={password => usuario.password = password} placeholder="Contraseña" />
                    </div>
                    &nbsp;
                    <div>
                        <label>Rol:</label>
                        <select ref={role => usuario.role = role}>
                            <option>Seleccione un rol...</option>
                            {roles.map(rol => (
                                <option value={rol.nombre}>{rol.nombre}</option>
                            ))}
                        </select>
                    </div>
                    &nbsp;
                    <div>
                        <button type="submit">Registrar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default NuevoUsuario;