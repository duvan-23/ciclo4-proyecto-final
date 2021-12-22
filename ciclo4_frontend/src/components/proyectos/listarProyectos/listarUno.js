
  import React, { Component} from "react"
  import Row from 'react-bootstrap/Row';
  import Container from 'react-bootstrap/Container';
  import Button from 'react-bootstrap/Button';
  import { Link } from 'react-router-dom'; 
  import Table from 'react-bootstrap/Table'
  // import Tabla from './Tabla';
  import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
  import { useParams } from "react-router-dom";

import {
    useQuery,
    gql
  } from "@apollo/client";
  
  const Proyectos =()=>{
    const {name}=useParams();
    const {loading,error,data} = useQuery(gql`
        {
            proyectos{
                name
                generalObjective
                specificObjectives
                budget
                startDate
                endDate
                leader_id
                status
                phase
                integrantes
            }
        }
    `)
  
    if(loading) return "<h1>Cargando</h1>"
    let proyectos2 = data.proyectos.filter(function (proyecto) {
        return proyecto.name === name;
    }).map(({name,generalObjective,specificObjectives,budget,startDate,endDate,leader_id,status,phase,integrantes})=>(
      
        <tr key={name}>
            <td>{name}</td>
            <td>{generalObjective}</td>
            <td>{specificObjectives}</td>
            <td>{budget}</td>
            <td>{startDate}</td> 
            <td>{endDate}</td>
            <td>{leader_id}</td>
            <td>{status}</td>
            <td>{phase}</td>
            <td>{integrantes}</td>
        </tr> 
       
      )
      );
     
      return (
        <div>
            <Table striped bordered hover >
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Objetivo General</th>
                <th>Objetivos especificos</th>
                <th>Objetivos especificos</th>
                <th>Presupuesto</th>
                <th>Fecha Final</th>
                <th>Lider</th>
                <th>Status</th>
                <th>Fase</th>
                <th>Intengrantes</th>
                </tr>
            </thead>
            <tbody>
                {proyectos2}
            </tbody>
        </Table>

        </div>
          )
  }
  const Avances =()=>{
    const {name}=useParams();
    const {loading,error,data} = useQuery(gql`
        {
            avances{
                project_id
                addDate
                description
                observations
            }
        }
    `)
    if(loading) return "<h1>Cargando</h1>"
      let datosTabla= data.avances.filter(function (proyecto) {
        return proyecto.project_id === name;
    }).map(({project_id,addDate,description,observations})=>(
        <tr>
            <td>{project_id}</td>
            <td>{addDate}</td>
            <td>{description}</td>
            <td>{observations}</td>
        </tr>
      ));
      return (
        
        <Table striped bordered hover >
            <thead>
                <tr>
                <th>Nombre del proyecto</th>
                <th>Fecha de avance</th>
                <th>Descripción</th>
                <th>Observaciones</th>
                </tr>
            </thead>
            <tbody>
                {datosTabla}
            </tbody>
        </Table>
          
          )
  }
class ListaProductoFiltro extends Component {
    render () {
        return (
            <Container>
                <Row  className="d-flex justify-content-center align-items-center mt-5"> 
                    <h1 >Proyectos</h1>
                    <ButtonToolbar
                        className="justify-content-between mb-4"
                        aria-label="Toolbar with Button groups"
                        >
                        <Link to="/proyectos">
                            <Button variant="primary">Volver</Button>
                        </Link>
                    </ButtonToolbar>
                    
                    <Proyectos/>
                    <h1 >Avance Asociado al Proyecto</h1>
                    <Avances/>
                    
                </Row> 
            </Container>
            
        );
    }
}
export default ListaProductoFiltro;