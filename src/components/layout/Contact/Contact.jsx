import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./forms.css"
import email from "../../../services/email"

const Contact = () => {

    const [mail, setMail] = useState({
        email:"",
        subject:"",
        message:""
    });

    const [errors, setErrors] = useState({
        email:"*",
        subject:"*",
        message:"*"
    });

    const updateMail = (name,value) => {
        setMail(previousState => {
            return { ...previousState, [name]: value }
        });
        validate(mail)
    }
    const updateErrors = (name, value) => {
        setErrors(previousState=>{
            return{ ...previousState, [name]:value }
        })
    }

    const validate = values => {
        
        if (!values.email)
            updateErrors("email", 'Required')
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)))
            updateErrors("email", 'Invalid email address')
        else 
            updateErrors("email", "")
        if (!values.subject) 
            updateErrors("subject", 'Required')
        else 
            updateErrors("subject", "")
        if (!values.message) 
            updateErrors("message", "Required")
        else 
            updateErrors("message", "")
        
    };
    let resp = "";
    const sendMail = async(e) => {
        e.preventDefault();
        validate(mail)
        if(errors.email===""&&errors.subject===""&&errors.message==="")
            resp = await email(mail.subject,mail.message,mail.email)
        alert(resp)
    }

    return (
        <>
            <br />
            <Form onSubmit={sendMail} className="forms">
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email <span className="error">{errors.email?errors.email:null}</span></Form.Label>
                    <Form.Control name="email"
                        onChange={(e)=>{updateMail(e.target.name,e.target.value)}}
                        value={mail.email}
                        type="email" placeholder="Enter your email address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Subject">
                    <Form.Label>Subject <span className="error">{errors.subject?errors.subject:null}</span></Form.Label>
                    <Form.Control name="subject"
                        onChange={(e)=>{updateMail(e.target.name,e.target.value)}}
                        value={mail.subject}
                        type="text" placeholder="Enter subject" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Message">
                    <Form.Label>Message <span className="error">{errors.message?errors.message:null}</span></Form.Label>
                    <Form.Control name="message"
                        onChange={(e)=>{updateMail(e.target.name,e.target.value)}}
                        value={mail.message}
                        as="textarea" rows={4} type="text" placeholder="Enter message in detail" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Contact;