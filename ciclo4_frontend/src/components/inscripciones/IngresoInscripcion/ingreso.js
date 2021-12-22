import Container from 'react-bootstrap/Container';   
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormProyecto from '../estudiantes/consultaEstudiantes';
function Nproyecto(){
    return(
        <div>
        <header>
          <Container >
            <Row className="titulo d-flex justify-content-center mt-1 mb-5">
              <Col xs={6}>
                <div className="text-center mt-4">
                  <h1 >Modulo de inscripción</h1>
                </div>
              </Col>
            </Row>  
          </Container>
        </header>
        <Container >
          <Row className="d-flex justify-content-center mt-5">
            <Col md={6} xs={10} /*className="border border-dark rounded d-flex justify-content-center "*/>{/* bg-info */}
            <FormProyecto/>
            </Col>
          </Row>  
        </Container>
      </div>
    )
}
export default Nproyecto;