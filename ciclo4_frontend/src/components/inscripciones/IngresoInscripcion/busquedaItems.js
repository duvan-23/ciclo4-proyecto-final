import React, { Component} from "react"
  import Row from 'react-bootstrap/Row';
  import Container from 'react-bootstrap/Container';
   
  import Table from 'react-bootstrap/Table'
  // import Tabla from './Tabla';
  

import {
    useQuery,
    gql
  } from "@apollo/client";
  
  const Proyectos =()=>{
    const {loading,error,data} = useQuery(gql`
        {
            inscripciones{
                project_id
                user_id
                status
                enrollmentDate
                egressDate
                role
              }
          }
    `)

    if(loading) return "<h1>Cargando</h1>"
    let proyectos2 = data.inscripciones.filter(function (proyecto) {
        return proyecto.status === "Pending";
    }).map(({project_id,user_id,status,enrollmentDate,egressDate,role})=>(
      
        <tr key={project_id}>
            <td>{project_id}</td>
            <td>{user_id}</td>
            <td>{status}</td>
            <td>{enrollmentDate}</td>
            <td>{egressDate}</td> 
            <td>{role}</td>
            <td>
            </td>
        </tr> 
       
      )
      );

      
      return (

        <Table striped bordered hover >
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>estado</th>
                <th>Fecha Inicio</th>
                <th>Fecha Final</th>
                <th>roll</th>
              
                </tr>
            </thead>
            <tbody>
                {proyectos2}
            </tbody>
        </Table>
        
          )
  }

class ListaProductoFiltro extends Component {
    render () {
        return (
            <Container>
                <Row  className="d-flex justify-content-center align-items-center mt-5"> 
                    <h1 >Solicitudes Pendientes</h1>
                    
                    
                    <Proyectos/>
                    
                    
                </Row> 
            </Container>
            
        );
    }
}
export default ListaProductoFiltro;