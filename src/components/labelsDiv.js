import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'

import UserProfile from '../user'

const LabelsDiv = () => {
    const [existingLabels, setExistingLables] = useState(["novel","sorting","new"])
    const [labeled, setLabeled] = useState([])
    const [commitId, setCommitId] = useState("")
    const [commitLink, setCommitLink] = useState("https://github.com")

    const createNewLabel = (e) => {
        e.preventDefault()
        const labelName = e.target[0].value
        setExistingLables(
            [...existingLabels,labelName]
        )
    }

    const addToLabeled = (labelData) => {
        setLabeled(
            [
                ...labeled, labelData.target.innerText
            ])
        const index = existingLabels.indexOf(labelData.target.innerText)
        console.log(index)
        let new_e_l = existingLabels
        new_e_l.splice(index, 1)
        console.log(new_e_l)
        setExistingLables([...new_e_l])
    }

    const removeFromLabeled = (labelData) => {
        setExistingLables(
            [
                ...existingLabels, labelData.target.innerText
            ]
        )
        const index = labeled.indexOf(labelData.target.innerText)
        console.log(index)
        let new_l = labeled
        new_l.splice(index, 1)
        console.log(new_l)
        setLabeled([...new_l])
    }

    useEffect(()=>{
        console.log('existing', existingLabels)
        console.log('labeled', labeled)
    }, [existingLabels, labeled])

    const getNewCommit = async(e) => {
        e.preventDefault()
        const language = e.target[0].value
        let randomPageNum = Math.floor(Math.random() * 25)
        const randomRepoUrl = await fetch(
            `https://api.github.com/search/repositories?q=language:${language}&page_limit=25&page=${randomPageNum}`
        ).then(
            res => res.json()
        ).then(
            res => {
                const randomRepo = Math.floor(Math.random() * 30)
                console.log(res['items'][randomRepo].url)
                return res['items'][randomRepo].url
           }
        )
        console.log(randomRepoUrl)

        const [commitsha, html_url] = await fetch(
            `${randomRepoUrl}/commits?per_page=5&page=${randomPageNum}`
        ).then(
            res => res.json()
        ).then(
            res => {
                const randomCommitNum = Math.floor(Math.random()*5)
                console.log(res)
                if(res){
                    return [res[randomCommitNum].sha, res[randomCommitNum].html_url]
                }          
            }
        )

        setCommitId(commitsha)
        setCommitLink(html_url)
    }

    const postLabels = async(e) => {
        e.preventDefault()
        const commitType = e.target[0].value
        const github = UserProfile.getName()
        console.log(commitType)
        if(github == ""){
            window.alert("you may not have signed up, go to the landing page and sign up")
        } else {
            const data = []
            labeled.forEach(label=>{
                data.push(
                    {
                        "commit link": commitLink,
                        "commit id": commitId,
                        "type of commit": commitType,
                        "label": label,
                        "github profile": github
                    }
                )
            })
            fetch("https://sheet.best/api/sheets/52c7c9e5-f96f-4604-8123-e34eb6779af7/tabs/labels", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((r) => r.json())
            .then((data) => {
                // The response comes here
                console.log(data);
                return data
            })
            .catch((error) => {
                // Errors are reported there
                console.log(error);
            });
            window.alert("You have posted your labels! Thank you for your contribution!")
        }
    }

    const Label = (props) => {
        return (
            <div className="label" onClick={props.onclick}>
                <div>
                    {props.labelData}
                </div>
            </div>
        )
    }

    const CommitData = () => {
        return(
            <>
                <h3>Commit_id: {commitId}</h3>
                <h4
                    style={{
                        whiteSpace:"wrap"
                    }}
                >
                    >
                    <a href={commitLink} target="_blank">
                        {commitLink}
                    </a>
                </h4>
                <br></br>
            </>
        )
    }

    const FormComponent = () => {
        return (
            <Form onSubmit={getNewCommit}>
                <Form.Select 
                    style={{ marginBottom:"10px"}} 
                    aria-label="Select Programming Language"
                >
                    <option>Select Language</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="C">C</option>
                    <option value="Go">Go</option>
                </Form.Select>
                <Button variant="primary" type="submit">
                    New Commit
                </Button>
            </Form>
          );
    }

    return (
        <>
            <Container>
                    <Row>
                        <Col style={{ marginTop:"10vh", minWidth:"300px" }} sm={3}>
                            <FormComponent />
                        </Col>
                        <Col style={{ borderLeft:"2px solid black" }} sm={9}>
                            <CommitData />
                            <Container>
                                <Row>
                                    <Col>
                                        <div className='labels-div'>
                                            {
                                                labeled.map(
                                                    label => {
                                                        return (
                                                            <Label
                                                                labelData={label}
                                                                onclick={label => removeFromLabeled(label)}
                                                            />
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <div className='labels-submit'>
                                    <Form onSubmit={postLabels}>
                                        <Form.Select 
                                            style={{ marginBottom:"10px"}} 
                                            aria-label="Select Programming Language"
                                        >
                                            <option>type of commit</option>
                                            <option value="Python">Peer Review</option>
                                            <option value="JavaScript">Documentation</option>
                                            <option value="C++">Bug/Issue Fix</option>
                                            <option value="Java">Feature</option>
                                            <option value="C">Process Change</option>
                                        </Form.Select>
                                        <Button type="submit">Submit</Button>
                                    </Form>
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
                                                                onclick={label => addToLabeled(label)}
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
                        </Col>
                    </Row>
                </Container>
            </>
    )
}

export default LabelsDiv