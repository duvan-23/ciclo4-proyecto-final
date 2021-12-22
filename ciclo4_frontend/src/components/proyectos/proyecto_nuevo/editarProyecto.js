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



const MUTATION_PROPYECTO_EDITAR = gql`
    mutation updateProyecto($_id:ID, $name:String, $generalObjective:String, $specificObjectives:String, $budget:Float){
        updateProyecto(_id:$_id, name:$name, generalObjective:$generalObjective, specificObjectives:$specificObjectives, budget:$budget)
    }
`;

const Proyectos= () => {

    const { _id } = useParams();
    console.log(_id);

    const [actualizarProyecto] = useMutation(MUTATION_PROPYECTO_EDITAR);
    let proyecto = {
        name: "",
        generalObjective:"",
        specificObjectives: "",
        budget: 1.1
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
    let proyectos1 = data.proyectos.filter(function (u) { return u._id === _id }).map(({ _id,name, generalObjective, specificObjectives, budget}) => (
        <form onSubmit={e => {
            e.preventDefault();
            actualizarProyecto({
                variables: {
                    _id: _id,
                    name: proyecto.name.value,
                    generalObjective: proyecto.generalObjective.value,
                    specificObjectives: proyecto.specificObjectives.value,
                    budget:Number.parseFloat( proyecto.budget.value)
                }
            })
            console.log(budget);
            window.location.href = '/proyectos';
        }} >
            <div className="text-center justify-content-center align-items-center">
                <div> 
                    <label>Nombre:</label>
                    <input style={{width: "300px"}} defaultValue={name} type="text" ref={name => proyecto.name = name} placeholder="Nombre del Usuario" required/>
                </div>
                &nbsp;
                <div>
                    <label>generalObjective:</label>
                    <input defaultValue={generalObjective} type="text" ref={generalObjective => proyecto.generalObjective = generalObjective} placeholder="Identificación" required/>
                </div>
                &nbsp;
                <div>
                    <label>specificObjectives:</label>
                    <input style={{width: "250px"}} defaultValue={specificObjectives} type="text" ref={specificObjectives => proyecto.specificObjectives = specificObjectives} placeholder="Email" required/>
                </div>
                &nbsp;
                <div>
                    <label>Presupuesto:</label>
                    <input defaultValue={budget} type="text" ref={budget => proyecto.budget = budget} placeholder="Contraseña" required/>
                </div>
                <div>
                    <button variant="primary" type="submit">Actualizar</button>
                </div>
            </div>
        </form>
    ));

    return (
        <div>{proyectos1}</div>
    )
}

class EditarProyecto extends Component {
    render() {
        return (
            <Container>
                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <h1 className="d-flex justify-content-center align-items-center mt-5">Editar Proyecto</h1>
                    <ButtonToolbar>
                        <Link to="/proyectos">
                            <Button variant="primary">Volver</Button>
                        </Link>
                    </ButtonToolbar>
                    &nbsp;
                    <Proyectos/>
                </Row>
            </Container>
        );
    }
}

export default EditarProyecto;