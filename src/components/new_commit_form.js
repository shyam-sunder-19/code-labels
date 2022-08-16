import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const FormComponent = () => {
    return (
        <Form>
            <Form.Select style={{ marginBottom:"10px"}} aria-label="Select Programming Language">
                <option>Select Language</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
            </Form.Select>
            <Button variant="primary" type="submit">
                New Commit
            </Button>
        </Form>
      );
}

export default FormComponent