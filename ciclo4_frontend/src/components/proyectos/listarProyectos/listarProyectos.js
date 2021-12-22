
  import React, { Component,useState} from "react"
  import Row from 'react-bootstrap/Row';
  import Container from 'react-bootstrap/Container';
  import Button from 'react-bootstrap/Button';
  import { Link } from 'react-router-dom'; 
  import Table from 'react-bootstrap/Table'
  // import Tabla from './Tabla';
  import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
  import ButtonGroup from 'react-bootstrap/ButtonGroup'
  import { FaSearch} from "react-icons/fa";
  import { GoCheck,GoPencil,GoPlus } from "react-icons/go";
import {
    useQuery,
    gql,useMutation
  } from "@apollo/client";
  const MUTATION_PROYECTO_EDITAR=gql`
  mutation crearProyecto($name: String){
        activeProyecto(name:$name)
       }
`;
const MUTATION_PROYECTO_FASE=gql`
  mutation updatePhaseProyectos($name: String,$phase: String){
    updatePhaseProyectos(name:$name, phase:$phase)
       }
`;
  
  const Proyectos =()=>{
    
    const [count, setCount] = useState(" ");
    const [fase, setFase] = useState(" ");
    const [nombre1, setNombre] = useState(" ");
    const[activadorDeProyectos] = useMutation(MUTATION_PROYECTO_EDITAR);
    const[updatePhaseProyectos] = useMutation(MUTATION_PROYECTO_FASE);
    function handleSubmit(e) {
        e.preventDefault();
        activadorDeProyectos({variables:{
                    name: count
                }})
        console.log('You clicked submit.'+count);
        window.location.reload(true);
      }
      function handleSubmit1(e) {
        e.preventDefault();
        updatePhaseProyectos({
            variables: {
                name: nombre1,
                phase: fase
            }
        })
        console.log(fase);
        console.log(nombre1);
        // console.log('You clicked ident.' + ident);
        // console.log('You clicked estado.' + estado);
        window.location.reload(true);
    }
    const {loading,error,data} = useQuery(gql`
        {
            proyectos{
                _id,
                name
                generalObjective
                specificObjectives
                budget
                startDate
                endDate
                leader_id
                status
                phase
            }
        }
    `)

    if(loading) return "<h1>Cargando</h1>"
    const datosTabla = data.proyectos.map(({_id,name,generalObjective,specificObjectives,budget,startDate,endDate,leader_id,status,phase})=>(
        <tr key={name}>
            <td>{name}</td>
            <td>{generalObjective}</td>
            {/* <td>{budget}</td> */}
            {/* <td>{startDate}</td>  */}
            {/* <td>{endDate}</td> */}
            <td>{leader_id}</td>
            <td>{status}</td>
            <td>{phase}</td>
            <td> <Link to={`/añadir/${name}`}>
                    <Button className="m-1 pr-2" variant="primary"><GoPlus/></Button>
                </Link></td>
            <td>
                <form onSubmit={handleSubmit1}>
                <ButtonGroup aria-label="Basic example">
                    <Button className="p-1 "type="submit" onClick={() => [setFase("Iniciado"), setNombre(name)]} variant="info">Iniciar</Button>
                    <Button className="p-1"type="submit" onClick={() => [setFase("En desarrollo"), setNombre(name)]} variant="secondary">desarrollo</Button>
                    <Button className="p-1"type="submit" onClick={() => [setFase("Finalizado"), setNombre(name)]} variant="success">finalizado</Button>
                </ButtonGroup>
                </form>
            </td>
            <td>
            <form onSubmit={handleSubmit}>
                <Button type="submit"onClick={() => setCount(name)}className="pr-2" variant="warning"><GoCheck/></Button>
            </form>   
            </td>
            <td><Link to={`/proyectos/${name}`}>
                    <Button className="m-1" variant="primary"><FaSearch/></Button>
                </Link>
            </td>
            <td><Link to={`/editarProyecto/${_id}`}>
                    <Button variant="danger"><GoPencil/></Button>
                </Link>
            </td>
        </tr> 
      )
      );

    // if(name){
    //     activadorDeProyectos({variables:{
    //         name: name 
    //     }})
    //     console.log(name+"esta adentro");
    // }
    
      
      return (
        // <table class="table table-success">
        //   <thead>
        //     <th>Nombre</th>
        //     <th>Objetivo General</th>
        //     <th>Presupuesto</th>
        //     {/* <th>Fecha inicial</th>
        //     <th>Fecha Final</th> */}
        //     <th>Lider</th>
        //     <th>Status</th>
        //   </thead>
        //   {datosTabla}
        // </table>
        <Table striped bordered hover >
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Objetivo General</th>
                <th>Lider</th>
                <th>Status</th>
                <th>Fase del proyecto</th>
                <th>Añadir integrantes</th>
                <th>Actualizar Fase</th>
                <th>Activar</th>
                <th>consultar</th>
                <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {datosTabla}
            </tbody>
        </Table>
        
          )
  }

class ListaProductos extends Component {
    render () {
        return (
            <Container>
                <Row  className="d-flex justify-content-center align-items-center mt-5"> 
                    <h1 >Proyectos</h1>
                    <ButtonToolbar
                        className="justify-content-between mb-4"
                        aria-label="Toolbar with Button groups"
                        >
                        <Link to="/Nproyecto">
                            <Button variant="primary">Nuevo proyecto</Button>
                        </Link>
                    </ButtonToolbar>
                    
                    <Proyectos/>
                    
                    
                </Row> 
            </Container>
            
        );
    }
}
export default ListaProductos;