import React, { Component} from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";

const MUTATION_PROPYECTO_EDITAR = gql`
    mutation insertUserToProyecto($identification:String, $name:String){
        insertUserToProyecto(identification:$identification, name:$name)
    }
`;

const Proyectos= () => {

    const { _id } = useParams();
    console.log(_id);

    const [actualizarProyecto] = useMutation(MUTATION_PROPYECTO_EDITAR);
    let proyecto = {
        name: ""
    }

    const { loading, error, data } = useQuery(gql`
        {
            proyectos{
                _id
                name
                generalObjective
                specificObjectives
                budget   
            }
        }
    `)

    console.log(data);

    if (loading) return "<h1>Cargando</h1>"
    let proyectos1 = data.proyectos.filter(function (u) { return u.name === _id }).map(({name}) => (
        <form onSubmit={e => {
            e.preventDefault();
            actualizarProyecto({
                variables: {
                    identification:proyecto.identification.value,
                    name: name
                }
            })
            window.location.href = '/proyectos';
        }} >
            <div className="text-center justify-content-center align-items-center">
                <div> 
                    <h2>{name}</h2>
                </div>
                &nbsp;
                <div>
                    <label class="p-3">Añadir integrante:</label>
                    <input type="text" ref={identification=> proyecto.identification = identification} placeholder="Identificación persona" />
                    <label>Para añadir integrantes al proyecto la persona dede estar con estado Autorizado</label>
                </div>
                <div>
                    <button class="mt-2 bg-info" type="submit">Añadir Integrante</button>
                </div>
            </div>
        </form>
    ));

    return (
        <div>{proyectos1}</div>
    )
}

class AñadirIntegrantes extends Component {
    render() {
        return (
            <div>
                <header>
                <Container >
                    <Row className="titulo d-flex justify-content-center mt-1 mb-5">
                    <Col xs={6}>
                        <div className="text-center mt-4">
                        <h1 >Añadir Integrantes</h1>
                        </div>
                    </Col>
                    </Row>  
                    <ButtonToolbar>
                            <Link to="/proyectos">
                                <Button variant="primary">Volver</Button>
                            </Link>
                        </ButtonToolbar>
                </Container>
                </header>
                <Container >
                <Row className="d-flex justify-content-center mt-5">
                    <Col md={6} xs={10} className="border border-dark rounded d-flex justify-content-center ">{/* bg-info */}
                    <Proyectos/>
                    </Col>
                </Row>  
                </Container>
            </div>
            
        );
    }
}

export default AñadirIntegrantes;