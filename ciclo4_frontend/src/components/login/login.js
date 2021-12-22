import React from "react";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import login from './login.png';
import { Link } from 'react-router-dom';
import {
    gql, useMutation
} from "@apollo/client";

const MUTATION_LOGIN = gql`
        mutation autenticar($usuario:String, $clave:String){
            autenticar(usuario:$usuario, clave:$clave)
    }
`;

const Login = () => {

    const [auth] = useMutation(MUTATION_LOGIN)
    let user = {
        usuario: "",
        clave: ""
    }

    return (
        <div className="text-center justify-content-center align-items-center">
            <Container>
                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <h1 className="d-flex justify-content-center align-items-center mt-5">Login</h1>
                    &nbsp;
                    <img style={{ width: "20%", height: "20%" }} src={login} alt="logo" />
                    &nbsp;
                </Row>
            </Container>
            &nbsp;
            <form onSubmit={e => {
                e.preventDefault();
                auth({
                    variables: {
                        usuario: user.usuario.value,
                        clave: user.clave.value
                    }
                })
                console.log(user);
                // console.log(clave);
                // window.location.href = '/usuarios';
            }} >
                <div>
                    <div>
                        <label>Email:</label>
                        <input type="text" ref={usuario => user.usuario = usuario} placeholder="email"></input>
                    </div>
                    &nbsp;
                    <div>
                        <label>Contraseña:</label>
                        <input type="text" ref={clave => user.clave = clave} placeholder="contraseña"></input>
                    </div>
                    &nbsp;
                    <div>
                        <Link to="/registrarUsuario">
                            Registrarse
                        </Link>
                    </div>
                    &nbsp;
                    <div>
                        <button type="submit">Inicio</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;