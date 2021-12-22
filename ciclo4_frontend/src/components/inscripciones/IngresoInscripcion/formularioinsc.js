
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  gql, useMutation
} from "@apollo/client";

const MUTATION_INSCRIPCION=gql`
  mutation crearProyecto( $project_id: String
    $user_id: String
    $status: String
    $enrollmentDate: String
    $egressDate: String
    
      
      ){
        createInscripcion(Inscripcion:{project_id: $project_id,
          user_id: $user_id,
         status: $status,
         enrollmentDate: $enrollmentDate,
         egressDate: $egressDate
              })
       }
`;




const FormProyecto =()=>{
  const[creadorDeInscricion] = useMutation(MUTATION_INSCRIPCION);
  let inscripcion ={
    project_id: " ",
    user_id: " ",
    status:" ",
    enrollmentDate:" ",
    egressDate:" "
   
  }

        return(
          <form onSubmit={e => {
            e.preventDefault();
            creadorDeInscricion({variables:{
              project_id: inscripcion.project_id.value,
              user_id:inscripcion.user_id.value,
              status:inscripcion.status.value,
              enrollmentDate:inscripcion.enrollmentDate.value,
              egressDate:inscripcion.egressDate.value,
              
              
          }})
          window.location.href = '/ConsultaEstudiante';
          }}>
 <div className="text-center mt-4">
                  <h1 >Nueva inscripción</h1>
                </div>
<div className="text-center mt-4">
  
                <label   class="p-3">Nombre Proyecto</label>
                <input ref={project_id =>inscripcion.project_id = project_id} placeholder="Proyecto" required/>
            </div>
            <div className="text-center mt-4">
                <label  class="p-3">Correo del usuario</label>
                <input ref={user_id => inscripcion.user_id = user_id} placeholder="usuario" required/>
            </div>
            
            <div className="text-center mt-4">
                <label  class="p-3">fecha inicial</label>
                <input type="date" ref={enrollmentDate => inscripcion.enrollmentDate =enrollmentDate} placeholder="fecha inicial" required/>
            </div>
            <div className="text-center mt-4">
                <label class="p-3">fecha final</label>
                <input type="date" ref={egressDate => inscripcion.egressDate = egressDate} placeholder="fecha final" required/>
            </div>
            
            <div class="text-center "><button class="bg-success"type="submit" >Registrar </button>

            </div>
            
        </form>
        )
}
export default FormProyecto;