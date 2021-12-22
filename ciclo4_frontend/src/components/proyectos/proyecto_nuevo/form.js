
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  gql, useMutation
} from "@apollo/client";

const MUTATION_PROYECTO=gql`
  mutation crearProyecto($name: String,
      $generalObjective: String,
      $specificObjectives: [String],
      $budget: Float,
      $startDate: String,
      $endDate: String,
      $status: String,
      $leader_id: String){
          createProyecto(Proyecto:{name: $name,
              generalObjective: $generalObjective,
              specificObjectives: $specificObjectives,
              budget: $budget,
              startDate: $startDate,
              endDate: $endDate,
              status: $status,
              leader_id: $leader_id})
       }
`;




const FormProyecto =()=>{
  const[creadorDeProyectos] = useMutation(MUTATION_PROYECTO);
  let proyecto ={
    name: " ",
    generalObjective:" ",
    specificObjectives: [],
    budget: 0,
    startDate: " ",
    endDate: " ",
    status: " ",
    leader_id:" "
  }
  

        return(
          <form onSubmit={e => {
            e.preventDefault(proyecto.startDate.value);
            console.log(proyecto.startDate.value);
            creadorDeProyectos({variables:{
              name: proyecto.name.value,
              generalObjective: proyecto.generalObjective.value,
              specificObjectives: proyecto.specificObjectives.value,
              budget: parseInt(proyecto.budget.value),
              startDate: proyecto.startDate.value,
              endDate: proyecto.endDate.value,
              status: proyecto.status.value,
              leader_id: proyecto.leader_id.value
          }})
          window.location.href = '/proyectos';
          }}>

<div>
                <label class="p-3">Nombre Proyecto</label>
                <input ref={name => proyecto.name = name} placeholder="Nombre" required/>
            </div>
            <div>
                <label class="p-3">Objetivos</label>
                <input ref={generalObjective => proyecto.generalObjective = generalObjective} placeholder="Objetivos" required/>
            </div>
            <div>
                <label class="p-3">Objetivos especificos</label>
                <input ref={specificObjectives => proyecto.specificObjectives = specificObjectives} placeholder="Objetivos generales" required/>
            </div>
            <div>
                <label class="p-3">fecha inicial</label>
                <input type="date" ref={startDate => proyecto.startDate = startDate} placeholder="fecha inicial" required/>
            </div>
            <div>
                <label class="p-3" >fecha final</label>
                <input type="date" ref={endDate => proyecto.endDate = endDate} placeholder="fecha final" required/>
            </div>
            <div>
                <label class="p-3">Lider</label>
                <input ref={leader_id => proyecto.leader_id = leader_id} placeholder="@ correo del lider" required/>
            </div>
            <div>
                <label class="p-3">Presupuesto</label>
                <input ref={budget => proyecto.budget = budget} placeholder="Presupuesto" required/>
            </div>
            <div><button class="bg-primary ml-4"type="submit">Registrar Proyecto</button></div>
        </form>
        )
}
export default FormProyecto;