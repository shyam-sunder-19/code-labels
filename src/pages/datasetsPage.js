import React, { useState } from 'react'
import NavbarComponent from '../components/navbar'
import { Form, Table } from 'react-bootstrap'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import UserProfile from '../user'
import csvDownload from 'json-to-csv-export'
import Footer from '../components/footer'

import './styles/datasets.css'

const DatasetsPage = () => {

    const [dataset, setDataset] = useState([])
    const [existingLabels, setExistingLables] = useState([])
    
    const getExistingLabels = async () => {
        const labels = await fetch(
            `https://sheet.best/api/sheets/52c7c9e5-f96f-4604-8123-e34eb6779af7/tabs/existing_labels?_limit=10`
        )
        .then(
            res => res.json()
        )
        .then(
            res => {
                return res
            }
        )
        const labels_ = []
        labels.map(
            label => {
                labels_.push(label.labels)
            }
        )
        console.log(labels_)
        setExistingLables(labels_)
        return labels_   
    }

    const getData = async (e) => {
        e.preventDefault()
        const label = e.target[0].value
        console.log(label)
        
        const userGithub = UserProfile.getName()

        if(userGithub == ""){
            window.alert("you may not have signed up, go to the landing page and sign up")
        } else {
            const labelData = await fetch(
                `https://sheet.best/api/sheets/52c7c9e5-f96f-4604-8123-e34eb6779af7/tabs/labels/label/${label}`
            )
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    return res
                }
            )
            setDataset(labelData)
        }
    }
    const searchExistingLabels = async (label) => {
        const userGithub = UserProfile.getName()

        if(userGithub == ""){
            window.alert("you may not have signed up, go to the landing page and sign up")
        } else {
            const labelData = await fetch(
                `https://sheet.best/api/sheets/52c7c9e5-f96f-4604-8123-e34eb6779af7/tabs/labels/label/${label}`
            )
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    return res
                }
            )
            setDataset(labelData)
        }
    }
    const downloadCsv = () => {
        csvDownload(dataset)
    }

    const ExistingLabels = () => {
        if (existingLabels.length == 0) {
            getExistingLabels()
        }
        return (
            <Row>
                <Col>
                    <div style={{display: "flex"}} className='existing-labels'>
                        <p style={{marginRight: "5px", fontWeight:600}}>Existing Labels:</p>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {
                                existingLabels.map(
                                    label => {
                                    return(<a style={{marginRight: "5px", cursor:"pointer"}} onClick={() => searchExistingLabels(label)}><u>{label}</u></a>)
                                    }
                                )
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }

    return(
        <>
            <NavbarComponent />
            <Col className="datasets" style={{margin:"20px", marginBottom: "80px"}}>
                <Row>
                    <Col>
                        <Form  onSubmit={getData}>
                            <input></input>
                            <Button type="submit">Search</Button>
                            <p>search by labels</p>
                        </Form>
                    </Col>
                    <ExistingLabels />
                </Row>
                    <hr></hr>
                    <Table striped border hover>
                        <thead>
                            <th>commit link</th>
                            <th>type of commit</th>
                            <th>label</th>
                            <th>github profile</th>
                        </thead>
                        <tbody>
                            {
                                dataset.slice(0,10).map(
                                    data => {
                                        return(
                                            <tr>
                                                <th>{data["commit link"]}</th>
                                                <th>{data["type of commit"]}</th>
                                                <th>{data["label"]}</th>
                                                <th>{data["github"]}</th>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </Table>
                    <hr></hr>
                    <p>
                        ... {dataset.length} results found
                    </p>
                <Row>
                    <hr></hr>
                    <Button onClick={downloadCsv}>Download Dataset</Button>
                </Row>
            </Col>
            <Footer />
        </>
    )
}

export default DatasetsPage