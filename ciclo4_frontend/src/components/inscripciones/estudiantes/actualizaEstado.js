import React, {useState} from "react";
//import React from "react";

//import { Link } from 'react-router-dom';
import {Form,Row,Col} from 'react-bootstrap';
import {useMutation } from "@apollo/client";
import {gql} from "@apollo/client";




const MUTATION_INSCRIPCION=gql`
       mutation updateStatusInscripcion($user_id: String, $status: String){
        updateStatusInscripcion(user_id:$user_id, status: $status)
       }
`;
  
const Phoneform=()=>{
  const [user_id, setName]=useState('')
  const [status, setPhone]=useState('')
  
  const [changeNumber] = useMutation(MUTATION_INSCRIPCION )
  const handleSubmit = e =>{

e.preventDefault()
  
changeNumber({variables:{user_id,status}})
setName('')
setPhone('')
window.location.reload(true);
  }

return (


<div>
<div className="text-center mt-4">
                  <h1 > Actualizar Estado de los usuarios</h1>
                </div>
                
                <form onSubmit={handleSubmit} >
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Nombre del usuario</Form.Label>
    <Form.Control type="user_id" placeholder="nombre completo del usuario" id="user_id" value={user_id} onChange={evt => setName(evt.target.value)}/>
    <Form.Text className="text-muted">
     
    </Form.Text>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
      <Form.Label as="legend" column sm={2}>
        Estado
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="acepted"
          name="formHorizontalRadios"
          id="user_id" value="acepted" onChange={evt => setPhone(evt.target.value)}
        />
        <Form.Check
          type="radio"
          label="rejected"
          name="formHorizontalRadios"
          id="user_id" value="rejected" onChange={evt => setPhone(evt.target.value)}
        />
       
      </Col>
    </Form.Group>
   
            <div><button type="submit">Registrar </button></div>
          
                </form>
       </div>
        
        
        
  
)


}
export default Phoneform;

