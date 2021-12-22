import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Nproyecto from './components/proyectos/proyecto_nuevo/nuevoProyecto'
import Home from './components/Home/home'
import NavBar from './components/nav/nav'
import ListaProductos from './components/proyectos/listarProyectos/listarProyectos'
import EditarProyecto from './components/proyectos/proyecto_nuevo/editarProyecto'
import AñadirIntegrantes from './components/proyectos/proyecto_nuevo/añadirIntegrantes'
import ListaProductoFiltro from'./components/proyectos/listarProyectos/listarUno'
import ListaUsuarios from './components/usuarios/listarUsuarios/listarUsuarios'
import NuevoUsuario from './components/usuarios/nuevoUsuario/nuevoUsuario'
import EditarUsuario from './components/usuarios/editarUsuario/editarUsuario'
import Login from './components/login/login'
import RegistrarUsuario from './components/usuarios/nuevoUsuario/registrarUsuario'
import ListarAvances from './components/avances/verAvances'
import NAvance from './components/avances/nuevoAvance'
// import CreateAvance from './components/avances/avanceCreado'
import FormAvances from './components/avances/formAvances'
import EditAvance from './components/avances/editarAvances'
import IngresoIncricion from './components/inscripciones/IngresoInscripcion/ingreso'
import ConsultaEstudiante from './components/inscripciones/estudiantes/consultaEstudiantes'
import Ninscripcion from './components/inscripciones/IngresoInscripcion/formularioinsc'
import ActualizaEstado from './components/inscripciones/estudiantes/actualizaEstado'
import Actinicial from './components/inscripciones/IngresoInscripcion/formIncripcion'
import BusquedaI from './components/inscripciones/IngresoInscripcion/busquedaItems'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
const client = new ApolloClient({
  uri: 'http://localhost:9091/consulta',
  cache: new InMemoryCache()
}); 


function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact>
          <Home />
      </Route>
      <Route path="/home" exact>
          <Home/>
      </Route>
      <Route path="/proyectos" exact>
        <NavBar pagina={"/proyectos"}/>
        <ApolloProvider client={client}>
           <ListaProductos/>
        </ApolloProvider>  
      </Route>
      <Route path="/proyectos/:name" exact>
        <NavBar pagina={"/proyectos"}/>
        <ApolloProvider client={client}>
           <ListaProductoFiltro/>
        </ApolloProvider>  
      </Route>
      <Route path="/Nproyecto" exact>
        <NavBar pagina={"/Nproyecto"}/>
        <ApolloProvider client={client}>
          <Nproyecto/>
        </ApolloProvider> 
      </Route>
      <Route path="/editarProyecto/:_id" exact>
        <NavBar pagina={"/editarProyecto"}/>
        <ApolloProvider client={client}>
            <EditarProyecto/>
        </ApolloProvider> 
      </Route>
      <Route path="/añadir/:_id" exact>
        <NavBar pagina={"/añadir"}/>
        <ApolloProvider client={client}>
            <AñadirIntegrantes/>
        </ApolloProvider> 
      </Route>
      <Route path="/usuarios" exact>
          <NavBar pagina={"/usuarios"} />
          <ListaUsuarios />
        </Route>
        <Route path="/crearUsuario" exact>
          <NavBar pagina={"/crearUsuario"} />
          <ApolloProvider client={client}>
            <NuevoUsuario />
          </ApolloProvider>
        </Route>
        <Route path="/editarUsuario/:_id" exact>
          <NavBar pagina={"/editarUsuario"} />
          <ApolloProvider client={client}>
            <EditarUsuario />
          </ApolloProvider>
        </Route>
        <Route path="/login" exact>
          <ApolloProvider client={client}>
            <Login />
          </ApolloProvider>
        </Route>
        <Route path="/registrarUsuario" exact>
          <ApolloProvider client={client}>
            <RegistrarUsuario />
          </ApolloProvider>
        </Route>
        <Route path="/ListarAvances" exact>
        <NavBar pagina={"/ListarAvances"}/>
        <ApolloProvider client={client}>
          <ListarAvances/>
        </ApolloProvider>
      </Route>
      <Route path="/NuevoAvance" exact>
        <NavBar pagina={"/NuevoAvance"}/>
        <ApolloProvider client={client}>
          <NAvance/>
        </ApolloProvider>
      </Route>
      <Route path="/formAvances" exact>
        <NavBar pagina={"/formAvances"}/>
        <ApolloProvider client={client}>
          <FormAvances/>
        </ApolloProvider>
      </Route>
      <Route path="/AvanceCreado" exact>
        <NavBar pagina={"/AvanceCreado"}/>
        <ApolloProvider client={client}>
            {/* <CreateAvance/> */}
        </ApolloProvider> 
      </Route>       
      <Route path="/EditarAvances/:project_id" exact>
        <NavBar pagina={"/EditarAvances/"}/>
        <ApolloProvider client={client}>
            <EditAvance/>
        </ApolloProvider>
      </Route>

      <Route path="/IngresoIncricion" exact>
        <NavBar pagina={"/IngresoIncricion"}/>
        <IngresoIncricion/>
      </Route>

      <Route path="/ConsultaEstudiante" exact>
        <NavBar pagina={"/ConsultaEstudiante"}/>
        <ConsultaEstudiante/>
      </Route>


      <Route path="/Ninscripcion" exact>
        <NavBar pagina={"/Ninscripcion"}/>
        <ApolloProvider client={client}>
          <Ninscripcion/>
        </ApolloProvider> 
      </Route>

     
      <Route path="/ActualizaEstado" exact>
        <NavBar pagina={"/ActualizaEstado"}/>
        <ApolloProvider client={client}>
          <ActualizaEstado/>
        </ApolloProvider> 
      </Route>

      <Route path="/Actinicial" exact>
        <NavBar pagina={"/Actinicial"}/>
        <ApolloProvider client={client}>
          <Actinicial/>
        </ApolloProvider> 
      </Route>
      <Route path="/BusquedaI" exact>
        <NavBar pagina={"/BusquedaI"}/>
        <ApolloProvider client={client}>
          <BusquedaI/>
        </ApolloProvider> 
      </Route>



      </Switch>
    </Router>



  );
}

export default App;