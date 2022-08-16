import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const FormComponent = () => {

    const submit = (e) => {
      e.preventDefault()
      const github = e.target[0].value
      const yrs_of_exp = e.target[1].value
      const prog_lang = e.target[2].value
    }
    return (
        <Form onSubmit={submit}>
          <Form.Group className="mb-3" controlId="github_profile_link">
            <Form.Label>Github Profile Link</Form.Label>
            <Form.Control type="url" placeholder="Enter github" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="years_of_exp">
            <Form.Label>Years of Programming Experience</Form.Label>
            <Form.Control type="number" placeholder="Enter Years" />
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

export default FormComponent