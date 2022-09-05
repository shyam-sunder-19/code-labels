import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row } from 'react-bootstrap';
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
    
    return(
        <>
            <Navbar bg="primary" expand="lg">
                <Col>
                    <Row style={{marginLeft: "10px"}}>
                        <Navbar.Brand onClick={() => onClickLogo()}><h3 style={{color: "white"}}>Open Codenet</h3></Navbar.Brand>
                    </Row>
                    <Row style={{marginLeft: "5px"}}>
                        <Navbar.Toggle style={{width:"100px"}} aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={()=> onClickLogo()}><button>Home</button></Nav.Link>
                                <Nav.Link onClick={() => onClickLabels()}><button>Labels</button></Nav.Link>
                                <Nav.Link onClick={() => onClickDatasets()}><button>Datasets</button></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Row>
                </Col>
            </Navbar>
        </>
    )
}

export default NavbarComponent