import React from 'react'
import NavbarComponent from '../components/navbar'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'


const DatasetsPage = () => {
    return(
        <>
            <NavbarComponent />
            <Col style={{marginTop:"5vh"}}>
                <Row>
                    <Col>
                        <input></input>
                        <Button>Search</Button>
                        <p>search by labels</p>
                    </Col>
                </Row>
                <Row>
                    {"Rows"}
                </Row>
            </Col>
        </>
    )
}

export default DatasetsPage