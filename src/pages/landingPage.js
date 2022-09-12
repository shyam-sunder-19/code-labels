import React from 'react'
import NavbarComponent from '../components/navbar'
import { Form, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import UserProfile from '../user'
import { useNavigate } from 'react-router-dom'

import Footer from '../components/footer'
import './styles/landingpage.css'

const LandingPage = () => {
    const navigate = useNavigate()
    const FormComponent = () => {
        return (
            <Form onSubmit={loginUser}>
              <Form.Group className="mb-3" controlId="github_profile_link">
                <Form.Label>Github Profile Link</Form.Label>
                <Form.Control type="url" placeholder="Enter github" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="language">
                <Form.Label>Primary Programming Lanuage</Form.Label>
                <Form.Control type="text" placeholder="Enter Language" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          );
    }

    const loginUser = async (e) => {
        e.preventDefault()
        let github = e.target[0].value
        const prog_lang = e.target[1].value
        const index = github.lastIndexOf('/')
        console.log(index)
        console.log(github.length)
        github = github.slice(index+1)
        console.log(github)
        console.log(prog_lang)

        const data = [{
            "github profile": github,
            "primary language": prog_lang
        }]
        
        const existing = await fetch(
            `https://sheet.best/api/sheets/4253adae-989a-427b-8e44-44be51365e06/github%20profile/${github}`
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

        if(existing.length > 0){
            window.alert("you've already signed up, go to the labels tab to start labeling")
        }
        else{
            fetch("https://sheet.best/api/sheets/4253adae-989a-427b-8e44-44be51365e06/tabs/user_data", {
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

            window.alert("you have now signed up, you can go to the labels page to start labeling")
        }
        UserProfile.setName(github)
        navigate('/label')
    }

    return(
        <>
            <NavbarComponent />
            <Container style={{marginTop:"10vh"}}>
                <Col style={{margin: "0 auto", maxWidth: "500px"}}>
                    <Row>
                        <h1>About Open Codenet</h1>
                        <div>
                        Crowdsourced, open database of labelled code commits for training and benchmarking classification models built to evaluate software code. 
                        </div>
                    </Row>
                    <br></br>
                    <Row>
                        <h2>Start Labeling</h2>
                        <FormComponent />
                    </Row>
                </Col>
            </Container>
            <Footer />
        </>
    )
}

export default LandingPage