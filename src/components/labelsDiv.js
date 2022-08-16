import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

const LabelsDiv = () => {
    const [existingLabels, setExistingLables] = useState([
        {
            "label_name":"novel",
            "existing": true
        },
        {
            "label_name":"sorting",
            "existing": true
        }
    ])
    const [labeled, setLabeled] = useState([])

    const createNewLabel = (e) => {
        e.preventDefault()
        const labelName = e.target[0].value
        setExistingLables(
        [
            ...existingLabels,
            {
                "label_name": labelName,
                "existing": true
            }
        ])
    }

    const addToLabeled = (labelData) => {
        labelData["existing"] = false
        setLabeled(
            [
                ...labeled,
                labelData
            ])
    }

    const removeFromLabeled = () => {

    }

    const Label = (props) => {

        if (!props.existingLabels) {
            return (
                <div className="label" onClick={props.onclick(props.labelData)}>
                    <div>
                        {props.labelData.label_name}
                    </div>
                </div>
            )
        } else {
            return(
                <div className="label" onClick={props.onclick(props.labelData)}>
                    <div>
                        {props.labelData.label_name}
                    </div>
                    <div>
                        x
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className='labels-div'>
                                         
                        </div>
                    </Col>
                </Row>
                <div className='labels-submit'>
                    <Form.Select style={{ marginBottom:"10px", width:"300px"}} aria-label="Submit Labels">
                        <option>Select Dataset</option>
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="C++">C++</option>
                    </Form.Select>
                    <Button>Submit</Button>
                </div>
                <hr></hr>
                <Row>
                    <Col>
                        <div className='existing-labels'>
                            {
                                existingLabels.map(
                                    label => {
                                        return(
                                            <Label 
                                                labelData={label}
                                                onclick={addToLabeled}
                                            />
                                        )
                                    }
                                )
                            }
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <h3>Create New Label</h3>
                        <Form onSubmit={createNewLabel}>
                            <input></input>
                            <Button type="submit">+</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LabelsDiv