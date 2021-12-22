import React, { Component} from "react"
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";

const MUTATION_AVANCE_EDITAR = gql`
    mutation updateAvance($project_id:String, $description:String, $observations:String){
        updateAvance(project_id:$project_id, description:$description, observations:$observations)
    }
`;

const Avances = () => {

    const {project_id} = useParams();
    console.log(project_id);

    const [actualizarAvance] = useMutation(MUTATION_AVANCE_EDITAR);
    let avance = {
        project_id: "",
        addDate: "",
        description: "",
        observations: ""
    }

    const { loading, error, data } = useQuery(gql`
        {
            avances{
                project_id
                addDate
                description
                observations
            }
        }
    `)

    console.log(data);

    if (loading) return "<h1>Cargando</h1>"
    let avances = data.avances.filter(function (u) { return u.project_id === project_id}).map(({ project_id, description, observations }) => (
        <form onSubmit={e => {
            e.preventDefault();
            actualizarAvance({
                variables: {
                    project_id: avance.project_id.value,
                    description: avance.description.value,
                    observations: avance.observations.value
                }
            })
            window.location.href = '/ListarAvances';
            console.log(avance.observations.value)

        }} >
            <div className="text-center justify-content-center align-items-center">
                <div>
                    <label className="p-3">Nombre del Proyecto:</label>
                    <input style={{ backgroundColor: "#c9c9c9" }} defaultValue={project_id} type="text" ref={project_id => avance.project_id = project_id} placeholder="Nombre del proyecto" readOnly />
                </div>
                &nbsp;
                <div>
                    <label className="p-3">Descripción:</label>
                    <input style={{width: "250px"}} defaultValue={description} type="text" ref={description => avance.description = description} placeholder="Descripción" required />
                </div>
                &nbsp;
                <div>
                    <label className="p-3">Observaciones:</label>
                    <input style={{width: "250px"}} defaultValue={observations} type="text" ref={observations => avance.observations = observations} placeholder="Observaciones" required />
                </div>
                </div>
                <div className="text-center justify-content-center align-items-center">
                &nbsp;
                <div>
                    <Button className="bg-primary ml-4" type="submit">Actualizar</Button>
                </div>
                </div>
            
        </form>
    ));

    return (
        <div>{avances}</div>
    )
}

class EditAvance extends Component {
    render() {
        return (
            <Container>
                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <h1 className="d-flex justify-content-center align-items-center mt-5">Editar Avance</h1>
                    &nbsp;
                    <ButtonToolbar
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                        aria-label="Toolbar with Button groups"
                    >
                        <div className="text-center justify-content-center align-items-center"></div> 
                        <Link to="/nuevoAvance">
                            <Button variant="primary">Nuevo Avance</Button>
                        </Link>
                    </ButtonToolbar>
                    &nbsp;
                    <Avances />
                </Row>

            
            </Container>
        );
    }
}

export default EditAvance;