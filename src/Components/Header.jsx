import { LinkContainer } from 'react-router-bootstrap';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container >
        <LinkContainer to='/'>
        <Navbar.Brand>CRUD avec RTK Query</Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/create">
                Créer
              </Nav.Link>
              <Nav.Link as={Link} to="/edit">
                Lire
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
