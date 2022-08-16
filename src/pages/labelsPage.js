import React from 'react'
import NavbarComponent from '../components/navbar'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

import FormComponent from '../components/new_commit_form'
import CommitData from '../components/commitData'
import LabelsDiv from '../components/labelsDiv'
import './styles/labelspage.css'

const LabelsPage = () => {
    return(
        <>
            <NavbarComponent />
            <Container>
                <Row>
                    <Col style={{ marginTop:"10vh", minWidth:"300px" }} sm={3}>
                        <FormComponent />
                    </Col>
                    <Col style={{ borderLeft:"2px solid black" }} sm={9}>
                        <CommitData />
                        <LabelsDiv />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LabelsPage