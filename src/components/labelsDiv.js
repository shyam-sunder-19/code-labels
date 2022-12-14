import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'

import UserProfile from '../user'

const LabelsDiv = () => {

    const [existingLabels, setExistingLables] = useState([])
    const [labeled, setLabeled] = useState([])
    const [commitId, setCommitId] = useState("")
    const [commitLink, setCommitLink] = useState("https://github.com")
    const [sheetLabels, setSheetLabels] = useState([])

    const getExistingLabels = async () => {
        const labels = await fetch(
            `https://sheet.best/api/sheets/4253adae-989a-427b-8e44-44be51365e06/tabs/existing_labels?_limit=10`
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

    const createNewLabel = (e) => {
        e.preventDefault()
        const labelName = e.target[0].value
        if (existingLabels.includes(labelName)){
            window.alert("label already exists")
        } else {
            setExistingLables(
                [...existingLabels,labelName]
            )
            const data = [{
                "labels": labelName
            }]
            const labels = async () => await fetch(
                `https://sheet.best/api/sheets/4253adae-989a-427b-8e44-44be51365e06/tabs/existing_labels`
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
            .then(
                res => {
                    const result = []
                    res.forEach(
                        re => result.push(re.labels)
                    )
                    setSheetLabels(result)
                    console.log(result)
                }
            ).then(
                () => {
                    if (!sheetLabels.includes(labelName)){
                        console.log(sheetLabels)
                        console.log(sheetLabels.includes(labelName))
                        fetch("https://sheet.best/api/sheets/4253adae-989a-427b-8e44-44be51365e06/tabs/existing_labels", {
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
                    }
                }
            )
            labels()
        }
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
        console.log(commitType)
        const github = UserProfile.getName()
        console.log(commitType)
        if (commitId == ''){
            window.alert("please first choose a commit to label")
            return
        } else if (labeled.length == 0 || commitType =='type of commit'){
            window.alert("please provide complete information for the commit, i.e. label, type of commit and scores")
            return
        } else if (github == "") {
            window.alert("you may not have signed up, go to the landing page and sign up")
            return
        } else {
            const data = []
            let allFine = true
            labeled.forEach(label=>{
                const index = labeled.indexOf(label)
                const score = e.target[index+1].value
                const confidence = e.target[index+2].value
                if (score == `score ${label}`) {
                    window.alert("Please provide scores for all the Lables Provided")
                    allFine = false
                    return
                } else if (confidence == `Input confidence for ${label} (1-10)`) {
                    window.alert("Please provide confidence level for all the labels Provided")
                    allFine = false
                    return
                } else {
                    data.push(
                        {
                            "commit link": commitLink,
                            "commit id": commitId,
                            "type of commit": commitType,
                            "label": label,
                            "github profile": github,
                            "score": score, 
                            "confidence": confidence,
                        }
                    )
                }
            })
            if (allFine){
                fetch("https://sheet.best/api/sheets/4253adae-989a-427b-8e44-44be51365e06/tabs/labels", {
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
                
            } else {
                window.alert("Please provide complete information for the labels")
                return
            }
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
            <div style={{"marginBottom":"5px", "marginTop": "15px"}}>
                <p>Commit_id: {commitId}</p>
                <h4
                    style={{
                        whiteSpace:"wrap"
                    }}
                >
                    <Button href={commitLink} target="_blank">
                        Go to Commit Page
                    </Button>
                    <p style={{"fontWeight":"200", "fontSize": "0.5em"}}>{commitLink}</p>
                </h4>
            </div>
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
    const ExistingLabels = () => {
        if (existingLabels.length == 0) {
            getExistingLabels()
        }
        return (
            <Row>
                <Col>
                    <h3>Existing Labels</h3>
                    <div className='existing-labels'>
                        {
                            console.log(existingLabels)
                        }
                        {   
                            Object.values(existingLabels).map(
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
        )
    }
    return (
        <>
            <Container>
                    <Row>
                        <Col style={{ marginTop:"10vh", minWidth:"300px" }} sm={3}>
                            <FormComponent />
                            <CommitData />
                        </Col>
                        <Col style={{ borderLeft:"2px solid grey", marginTop:"5px" }} sm={9}>
                            <Container>
                                <ExistingLabels />
                                <Row>
                                    <Col style={{"marginBottom":"15px"}}>
                                        <h3>Create New Label</h3>
                                        <Form onSubmit={createNewLabel}>
                                            <input style={{"padding": "5px", "marginRight": "2px"}}></input>
                                            <Button type="submit">+</Button>
                                        </Form>
                                    </Col>
                                    <hr></hr>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>Selected Labels</h3>
                                        <p>Select the labels that you want to provide for scoring.</p>
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
                                            <option value="Peer Review">Peer Review</option>
                                            <option value="Documentation">Documentation</option>
                                            <option value="Bug/Issue Fix">Bug/Issue Fix</option>
                                            <option value="Feature">Feature</option>
                                            <option value="Process Change">Process Change</option>
                                        </Form.Select>
                                        <h4>input scores for the labels (1-10)</h4>
                                        {
                                            labeled.map(
                                                label => {
                                                    return(
                                                        <>
                                                            <Form.Select 
                                                                style={{ marginBottom:"10px"}} 
                                                                aria-label={`Input Score (0-10) for ${label}`}
                                                            >
                                                                <option>score {label}</option>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                                <option value={6}>6</option>
                                                                <option value={7}>7</option>
                                                                <option value={8}>8</option>
                                                                <option value={9}>9</option>
                                                                <option value={10}>10</option>
                                                            </Form.Select>
                                                            <p>Input how confident you are with the label provided</p>
                                                            <Form.Select 
                                                                style={{ marginBottom:"10px"}} 
                                                                aria-label={`Confidence for the label (0-10) ${label}`}
                                                            >
                                                                <option>Input confidence for {label} (1-10)</option>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                                <option value={6}>6</option>
                                                                <option value={7}>7</option>
                                                                <option value={8}>8</option>
                                                                <option value={9}>9</option>
                                                                <option value={10}>10</option>
                                                            </Form.Select>
                                                        </>  
                                                    )
                                                }
                                            )
                                        }
                                        <p>submit inputs</p>
                                        <Button type="submit">Submit</Button>
                                    </Form>
                                </div>
                                <hr></hr>
                                <Row></Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </>
    )
}

export default LabelsDiv
