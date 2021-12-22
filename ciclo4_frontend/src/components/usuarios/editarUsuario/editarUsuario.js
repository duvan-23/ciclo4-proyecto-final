import React, { Component } from "react"
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {useParams } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";


const MUTATION_USUARIO_EDITAR = gql`
    mutation updateUsuario($_id:ID, $fullName:String, $identification:String, $email:String, $password:String, $role:String, $status:String){
        updateUsuario(_id:$_id, fullName:$fullName, identification:$identification, email:$email, password:$password, role:$role, status:$status)
    }
`;

const Usuarios = () => {

    const { _id } = useParams();
    console.log(_id);

    const [actualizarUsuario] = useMutation(MUTATION_USUARIO_EDITAR);
    let usuario = {
        fullName: "",
        identification: "",
        email: "",
        password: "",
        role: "",
        status: ""
    }

    const { loading, error, data } = useQuery(gql`
        {
            usuarios{
                _id
                fullName
                identification
                email
                password
                role
                status
            }
        }
    `)

    console.log(data);

    if (loading) return "<h1>Cargando</h1>"
    let user = data.usuarios.filter(function (u) { return u._id === _id }).map(({ _id, fullName, identification, email, password, role, status }) => (
        <form onSubmit={e => {
            e.preventDefault();
            actualizarUsuario({
                variables: {
                    _id: _id,
                    fullName: usuario.fullName.value,
                    identification: usuario.identification.value,
                    email: usuario.email.value,
                    password: usuario.password.value,
                    role: usuario.role.value,
                    status: usuario.status.value
                }
            })
            window.location.href = '/usuarios';
        }} >
            <div className="text-center justify-content-center align-items-center">
                <div>
                    <label>Nombre del Usuario:</label>
                    <input style={{width: "300px"}} defaultValue={fullName} type="text" ref={fullName => usuario.fullName = fullName} placeholder="Nombre del Usuario" required/>
                </div>
                &nbsp;
                <div>
                    <label>Identificación:</label>
                    <input defaultValue={identification} type="text" ref={identification => usuario.identification = identification} placeholder="Identificación"required />
                </div>
                &nbsp;
                <div>
                    <label>Email:</label>
                    <input style={{width: "250px"}} defaultValue={email} type="text" ref={email => usuario.email = email} placeholder="Email" required/>
                </div>
                &nbsp;
                <div>
                    <label>Contraseña:</label>
                    <input defaultValue={password} type="password" ref={password => usuario.password = password} placeholder="Contraseña" required/>
                </div>
                &nbsp;
                <div>
                    <label>Rol:</label>
                    <input style={{ backgroundColor: "#c9c9c9" }} defaultValue={role} type="text" ref={role => usuario.role = role} placeholder="Rol" readOnly />
                </div>
                &nbsp;
                <div>
                    <label>Estado:</label>
                    <input style={{ backgroundColor: "#c9c9c9" }} defaultValue={status} type="text" ref={status => usuario.status = status} placeholder="Estado" readOnly />
                </div>
                &nbsp;
                <div>
                    <button variant="primary" type="submit">Actualizar</button>
                </div>
            </div>
        </form>
    ));

    return (
        <div>{user}</div>
    )
}

class EditarUsuario extends Component {
    render() {
        return (
            <Container>
                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <h1 className="d-flex justify-content-center align-items-center mt-5">Editar Usuario</h1>
                    &nbsp;
                    <ButtonToolbar
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                        aria-label="Toolbar with Button groups"
                    >
                    </ButtonToolbar>
                    &nbsp;
                    <Usuarios />
                </Row>
            </Container>
        );
    }
}

export default EditarUsuario;