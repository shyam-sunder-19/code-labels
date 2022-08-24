import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom"

const NavbarComponent = () => {
    
    const navigate = useNavigate();

    const onClickLogo = () => {
        navigate('/');
    }

    const onClickLabels = () => {
        navigate('/label');
    }
    
    const onClickDatasets = () => {
        navigate('/datasets')
    }

    const onClickUser = () => {
        navigate('/user')
    }
    
    return(
        <>
            <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => onClickLogo()}><button>Open Codenet</button></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => onClickLabels()}><button>Labels</button></Nav.Link>
                        <Nav.Link onClick={() => onClickDatasets()}><button>Datasets</button></Nav.Link>
                        <Nav.Link onClick={() => onClickUser()}><button>My Data</button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent