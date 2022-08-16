import React from 'react'
import NavbarComponent from '../components/navbar'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'

const UserAccount = () => {
    return(
        <>
            <NavbarComponent />
            <Row>
                <Col sm={3}>
                    <div className='user-data'>
                        <div className='user-name'>User Name</div>
                        <div className='user-github'>github.com</div>
                        <div className='preferred-language'>Python</div>
                        <div className='years-of-exp'>6</div>
                    </div>
                </Col>
                <Col sm={9} style={{borderLeft:"3px solid black"}}>
                    <div className='search-my-datasets'>
                        <input></input>
                        <Button>Search</Button>
                    </div>
                    <div className='my-datasets'>
                        {"user"}
                    </div>
                </Col>
            </Row>
        </>
        
    )
}

export default UserAccount