
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {
  gql, useMutation
} from "@apollo/client";

const MUTATION_AVANCE = gql`
  mutation createAvance($project_id: String,$description: String,$observations: String){
          createAvance(Avance: {project_id: $project_id,description: $description,observations: $observations})
       }
`;

const FormAvances =()=>{
  const[creadorDeAvances] = useMutation(MUTATION_AVANCE);
  let Avance ={
    project_id: " ",
    addDate:" ",
    description: " ",
    observations: " "
  }
  

        return(
          <form onSubmit={e => {
            e.preventDefault();
            console.log(Avance.project_id+''+Avance.addDate+''+Avance.description+''+Avance.observations);
            creadorDeAvances({variables:{
              project_id: Avance.project_id.value,
              addDate: Avance.addDate.value,
              description: Avance.description.value,
              observations: Avance.observations.value
          }})
          window.location.href = '/ListarAvances';
          }}>

<div className="text-center justify-content-center align-items-center">
            <div>
                <label className="p-3">Nombre Proyecto</label>
                <input ref={project_id => Avance.project_id = project_id} placeholder="Nombre" required />
            </div>
            <div>
                <label className="p-3">Fecha</label>
                <input type="date" ref={addDate => Avance.addDate = addDate} placeholder="Fecha" required/>
            </div>
            <div>
                <label className=" p-3">Descripción</label>
                <input ref={description => Avance.description = description} placeholder="Descripción" required/>
            </div>
            <div>
                <label className=" p-3">Observaciones</label>
                <input ref={observations => Avance.observations = observations} placeholder="Observaciones" required/>
            </div>
        
        <br/>   
        <div className="text-center justify-content-center align-items-center">
            <div><Button className="bg-primary ml-4"type="submit">Registrar Avance</Button></div>
            <div>
              <br/>
                    
              </div>
        </div>
        
        <br/>
        </div>
        </form>
      
        )
}
export default FormAvances;