import Container from 'react-bootstrap/Container';   
import Row from 'react-bootstrap/Row';


import React from "react";

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 
import Table from 'react-bootstrap/Table'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
  const client = new ApolloClient({
    uri: 'http://localhost:9091/consulta',
    cache: new InMemoryCache()
  }); 
  
  const Inscripciones =()=>{
    const {loading,error,data} = useQuery(gql`
        {
          inscripciones{
              project_id
              user_id
              status
              enrollmentDate
              egressDate
            }
        }
    `)
    if(loading) return "<h1>Cargando</h1>"
      const datosTabla = data.inscripciones.map(({project_id,user_id,status,enrollmentDate,egressDate})=>(
        <tr >
            <td >{project_id}</td>
            <td>{user_id}</td>
            <td>{status}</td>
            <td>{enrollmentDate}</td>
            <td>{egressDate}</td>
        </tr>
      ));
      return (
     
        <Table striped bordered hover >
            <thead>
                <tr>
                <th>Proyecto</th>
                <th>Usuario</th>
                <th>Estado de la inscripcion</th>
                <th>Fecha Inscripcion</th>
                <th>Fecha de salida</th>
                </tr>
            </thead>
            <tbody>
                {datosTabla}
            </tbody>
        </Table>
          
          )
  }



function Ninscripcion(){
    return(
        <div>
        
        <Container>
                <Row  className="d-flex justify-content-center align-items-center mt-5"> 
                    
                    <ButtonToolbar
                        className="justify-content-between mb-4"
                        aria-label="Toolbar with Button groups"
                        >
                        <Link to="/Ninscripcion">
                            <Button variant="success">Nueva Inscripción</Button>
                            
                        </Link>
                        <Link to="/Actinicial">
                            <Button variant="success">Actualizacion Inscripción </Button>
                            
                        
                        </Link>
                    </ButtonToolbar>
                    <ApolloProvider client={client}>
                        <Inscripciones/>
                    </ApolloProvider>
                    
                </Row> 
            </Container>
      </div>
    )
}
export default Ninscripcion;