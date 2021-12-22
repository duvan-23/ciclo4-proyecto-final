import React, { Component, useState } from "react"
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:9091/consulta',
    cache: new InMemoryCache()
});

const MUTATION_STATUS_EDITAR = gql`
    mutation updateStatusUsuario($identification: String, $status: String){
        updateStatusUsuario(identification:$identification, status:$status)
    }
`;

const Usuarios = () => {

    const [estado, setEstado] = useState("");
    const [ident, setIdent] = useState("");
    const [cambiarStatus] = useMutation(MUTATION_STATUS_EDITAR);

    function handleSubmit(e) {
        e.preventDefault();
        cambiarStatus({
            variables: {
                identification: ident,
                status: estado
            }
        })
        console.log(estado);
        console.log(ident);
        // console.log('You clicked ident.' + ident);
        // console.log('You clicked estado.' + estado);
        window.location.reload(true);
    }

    // const estados = [
    //     { id: 1, nombre: "Autorizado" },
    //     { id: 2, nombre: "No Autorizado" }
    // ];

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

    if (loading) return "<h1>Cargando</h1>"
    const datosTabla = data.usuarios.map(({ _id, fullName, identification, email, password, role, status }) => (
        <tr key={identification}>
            <td>{fullName}</td>
            <td>{identification}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>{status}</td>
            <td>
                <Link to={`/editarUsuario/${_id}`}>
                    <Button variant="warning">Editar</Button>
                </Link>
            </td>
            <td>
                <form onSubmit={handleSubmit}>
                    <Button type="submit" onClick={() => [setEstado("Autorizado"), setIdent(identification)]} variant="success">Autorizar</Button>
                    <Button type="submit" onClick={() => [setEstado("No Autorizado"), setIdent(identification)]} variant="danger">Denegar</Button>
                </form>
            </td>
        </tr>
    ));

    return (
        <Table striped bordered hover >
            <thead className="text-center justify-content-center align-items-center">
                <tr>
                    <th>Nombre</th>
                    <th>Identificación</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Opciones</th>
                    <th>Cambiar Estado</th>
                </tr>
            </thead>
            <tbody className="text-center justify-content-center align-items-center">
                {datosTabla}
            </tbody>
        </Table>
    )
}

class ListaUsuarios extends Component {
    render() {
        return (
            <Container>
                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <h1 className="d-flex justify-content-center align-items-center mt-5">Usuarios</h1>
                    &nbsp;
                    <ButtonToolbar
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                        aria-label="Toolbar with Button groups"
                    >
                        <Link to="/crearUsuario">
                            <Button variant="primary">Nuevo Usuario</Button>
                        </Link>
                    </ButtonToolbar>
                    &nbsp;
                    <ApolloProvider client={client}>
                        <Usuarios />
                    </ApolloProvider>
                </Row>
            </Container>
        );
    }
}

export default ListaUsuarios;