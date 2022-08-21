import React, { useState } from 'react'
import NavbarComponent from '../components/navbar'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import UserProfile from '../user'
import { Form } from 'react-bootstrap'
import csvDownload from 'json-to-csv-export'

const UserAccount = () => {
    const [dataset, setDataset] = useState([
        {
            "commit link": "",
            "type of commit": "",
            "label": "",
            "github": ""
        },
        {
            "commit link": "",
            "type of commit": "",
            "label": "",
            "github": ""
        }
    ])
    const userGithub = UserProfile.getName()
    const getDataset = async (e) => {
        e.preventDefault()
        const label = e.target[0].value
        console.log(label)
        const userGithub = UserProfile.getName()

        if(userGithub == ""){
            window.alert("you may not have signed up, go to the landing page and sign up")
        } else {
            const labelData = await fetch(
                `https://sheet.best/api/sheets/52c7c9e5-f96f-4604-8123-e34eb6779af7/tabs/labels/github%20profile/${userGithub}`
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

    return(
        <>
            <NavbarComponent />
            <Row style={{margin:"25px"}}>
                <Col sm={3}>
                    <div className='user-data'>
                        <div className='user-name'>{userGithub}</div>
                        <div className='user-github'>
                            <a href={`github.com/${userGithub}`}>
                                github.com/{userGithub}
                            </a>
                        </div>
                    </div>
                </Col>
                <Col sm={9} style={{borderLeft:"3px solid black"}}>
                    <div className='search-my-datasets'>
                        <Form onSubmit={getDataset}>
                            <input></input>
                            <Button>Search</Button>
                            <p>search by users</p>
                        </Form>
                    </div>
                    <hr></hr>
                        <Button onClick={downloadCsv}>Download Dataset</Button>
                    <hr></hr>
                    <div className='my-datasets'>
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
                        <p>
                            ... {dataset.length} results found
                        </p>
                    </div>
                </Col>
            </Row>
        </>
        
    )
}

export default UserAccount