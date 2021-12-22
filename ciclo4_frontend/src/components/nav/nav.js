import Nav from 'react-bootstrap/Nav'
const NavBar = ({ pagina }) => {
    return (
        <Nav justify variant="pills" defaultActiveKey={pagina} className="explorer">
            
            <Nav.Item>
                <Nav.Link href="/home">HOME</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/proyectos" eventKey="/proyectos">PROYECTOS</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/usuarios" eventKey="/usuarios">USUARIOS</Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link href="/ListarAvances" eventKey="/ListarAvances">AVANCES</Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link href="/IngresoIncricion">INSCRIPCIONES</Nav.Link>
        </Nav.Item>
        

        </Nav>

    );
}

export default NavBar;