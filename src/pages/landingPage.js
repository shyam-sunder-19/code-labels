import React from 'react'
import NavbarComponent from '../components/navbar'
import FormComponent from '../components/signup_form'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

import './styles/landingpage.css'

const LandingPage = () => {
    return(
        <>
            <NavbarComponent />
            <Container style={{marginTop:"10vh"}}>
                <Row>
                    <Col>
                        <h2>Start Labeling</h2>
                        <FormComponent />
                    </Col>
                    <Col>
                        <h1>About Code Labels</h1>
                        <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LandingPage