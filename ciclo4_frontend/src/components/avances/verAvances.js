  import React, { Component} from "react"
  import Row from 'react-bootstrap/Row';
  import Container from 'react-bootstrap/Container';
  import Button from 'react-bootstrap/Button';
  import { Link } from 'react-router-dom'; 
  import Table from 'react-bootstrap/Table'
  // import Tabla from './Tabla';
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
  
  const Avances =()=>{
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
      const datosTabla = data.avances.map(({project_id,addDate,description,observations})=>(
        <tr>
            <td>{project_id}</td>
            <td>{addDate}</td>
            <td>{description}</td>
            <td>{observations}</td>
            <td><Link to={`/editarAvances/${project_id}`}>
                    <Button variant="warning">Editar Avance</Button>
                </Link></td>
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
                <th>Editar Avances</th>
                </tr>
            </thead>
            <tbody>
                {datosTabla}
            </tbody>
        </Table>
          
          )
  }

  class ListarAvances extends Component {
    render () {
        return (
            <Container>
                <Row  className="d-flex justify-content-center align-items-center mt-5"> 
                    <h1>Lista de Avances</h1>
                    <ButtonToolbar
                        className="justify-content-between mb-4"
                        aria-label="Toolbar with Button groups"
                        >
                        <Link to="/nuevoAvance">
                            <Button variant="primary">Nuevo Avance</Button>
                        </Link>

                        
                    </ButtonToolbar>
                    <ApolloProvider client={client}>
                        <Avances/>
                    </ApolloProvider>
                    
                </Row> 
            </Container>
            
        );
    }
}
export default ListarAvances;