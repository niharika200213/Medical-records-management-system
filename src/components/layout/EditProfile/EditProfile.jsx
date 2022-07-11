import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "./register.css"
import { regPat, regDoc } from "../../../services/doctors";
import "./forms.css"
const EditProfile = (props) => {

    const [patData, setPatData] = useState({});
    const [patErrors, setPatErrors] = useState({
        name: "*",
        age: "*",
    });
    const [docData, setDocData] = useState({});
    const [docErrors, setDocErrors] = useState({
        name: "*",
        age: "*",
        clinicLocation: "*",
        clinicName: "*",
        specialization: "*",
        contact: "*",
        fees: "*"
    });
    useEffect(() => {
        const setData = async () => {
            if (props.isPat !== false) {

                setPatData({
                    name: props.isPat[0],
                    age: props.isPat[1],
                    profilePic: props.isPat[2] ? props.isPat[2] : "",
                    bloodgrp: props.isPat[3],
                    allergies: props.isPat[4],
                    remarks: props.isPat[5]
                });
            }
            else if (props.isDoc !== false) {
                setDocData({
                    name: props.isDoc[0],
                    age: props.isDoc[2],
                    profilePic: props.isDoc[1] ? props.isDoc[1] : "",
                    clinicLocation: props.isDoc[3],
                    clinicName: props.isDoc[4],
                    specialization: props.isDoc[5],
                    contact: props.isDoc[6],
                    fees: props.isDoc[7]
                })
            }
        }
        setData();
    },[])
    
    if (!props.isDoc && !props.isPat) {
        return (
            <h3 style={{ margin: "20px" }}>You are not registered</h3>
        );
    }
    else if (props.isPat !== false) {
        const updatepatData = (name, value) => {
            setPatData(previousState => {
                console.log(previousState)
                return { ...previousState, [name]: value }
            });
            validate(patData)
            console.log(patData)
        }
        const updateErrors = (name, value) => {
            setPatErrors(previousState => {
                return { ...previousState, [name]: value }
            })
        }
        const validate = values => {

            if (!values.name)
                updateErrors("name", 'Required')
            else
                updateErrors("name", "")
            if (!values.age)
                updateErrors("age", 'Required')
            else
                updateErrors("age", "")
        };

        const editProfile = async (e) => {
            let resp = false;
            e.preventDefault();
            if (patErrors.name === "" && patErrors.age === "") {
                resp = await regPat(patData.name, patData.age, patData.profilePic,
                    patData.bloodgrp, patData.allergies, patData.remarks, 1);
                if (resp === true)
                    alert('Data updated')
            }
            else
                alert('please enter name and age');
        }

        return (
            <>
                <br /><br />
                <img style={{ width: "20%", margin: "auto", display: "block" }} src={/\bhttps/.test(props.isPat[2]) ? props.isPat[2] : "https://firebasestorage.googleapis.com/v0/b/meddocs-e21f8.appspot.com/o/patientProfile.png?alt=media&token=4e798cc8-3549-45d9-8b83-8ffc8fffddfe"} />
                <Form className="forms" onSubmit={editProfile}>
                    <Form.Group className="mb-3" controlId="profilePic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control name="profilePic"
                            onChange={(e) => { updatepatData(e.target.name, e.target.files[0]["name"]) }}
                            type="file" accept="image/*" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name <span className="error">{patErrors.name ? patErrors.name : null}</span></Form.Label>
                        <Form.Control name="name"
                            onChange={(e) => { updatepatData(e.target.name, e.target.value) }}
                            defaultValue={props.isPat[0]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Age <span className="error">{patErrors.age ? patErrors.age : null}</span></Form.Label>
                        <Form.Control name="age"
                            onChange={(e) => { updatepatData(e.target.name, e.target.value) }}
                            defaultValue={props.isPat[1]}
                            type="number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bloodgrp">
                        <Form.Label>Blood Group</Form.Label>
                        <Form.Control name="bloodgrp"
                            onChange={(e) => { updatepatData(e.target.name, e.target.value) }}
                            defaultValue={props.isPat[3]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="allergies">
                        <Form.Label>Allergies (if any)</Form.Label>
                        <Form.Control name="allergies"
                            onChange={(e) => { updatepatData(e.target.name, e.target.value) }}
                            defaultValue={props.isPat[4]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="remarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control name="remarks"
                            onChange={(e) => { updatepatData(e.target.name, e.target.value) }}
                            defaultValue={props.isPat[5]}
                            type="text" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
    else if (props.isDoc !== false) {

        const updateErrors = (name, value) => {
            setDocErrors(previousState => {
                return { ...previousState, [name]: value }
            })
        }

        const updatedocData = (name, value) => {
            setDocData(previousState => {
                return { ...previousState, [name]: value }
            });
            console.log(docData)
            validate(docData)
        }

        const validate = values => {
            if (!values.name)
                updateErrors("name", 'Required')
            else
                updateErrors("name", "")
            if (!values.age)
                updateErrors("age", 'Required')
            else
                updateErrors("age", "")

            if (!values.clinicLocation)
                updateErrors("clinicLocation", 'Required')
            else
                updateErrors("clinicLocation", "")
            if (!values.clinicName)
                updateErrors("clinicName", 'Required')
            else
                updateErrors("clinicName", "")
            if (!values.specialization)
                updateErrors("specialization", 'Required')
            else
                updateErrors("specialization", "")
            if (!values.contact)
                updateErrors("contact", 'Required')
            else if (values.contact.toString().length !== 10)
                updateErrors("contact", 'Enter 10 digits contact number')
            else
                updateErrors("contact", "")
            if (!values.fees)
                updateErrors("fees", 'Required')
            else
                updateErrors("fees", "")
        };

        const editProfile = async (e) => {
            let resp = false;
            e.preventDefault();
            if (docErrors.name === "" && docErrors.age === "" && docErrors.clinicLocation === "" && docErrors.clinicName === "" && docErrors.specialization === "" && docErrors.contact === "" && docErrors.fees === "") {
                resp = await regDoc(docData.name, docData.profilePic, docData.age,
                    docData.clinicLocation, docData.clinicName, docData.specialization, docData.contact, docData.fees, 1)
                if (resp === true)
                    alert('Data updated')
            }
            else
                alert('please enter required data');
        }
        return (
            <>
                <br /><br />
                <img style={{ width: "20%", margin: "auto", display: "block" }} src={/\bhttps/.test(props.isDoc[1]) ? props.isDoc[1] : "https://firebasestorage.googleapis.com/v0/b/meddocs-e21f8.appspot.com/o/patientProfile.png?alt=media&token=4e798cc8-3549-45d9-8b83-8ffc8fffddfe"} />
                <Form onSubmit={editProfile} className="forms">
                    <Form.Group className="mb-3" controlId="profilePic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control name="profilePic"
                            onChange={(e) => { updatedocData(e.target.name, e.target.files[0]["name"]) }}
                            type="file" accept="image/*" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name <span className="error">{docErrors.name ? docErrors.name : null}</span></Form.Label>
                        <Form.Control name="name"
                            onChange={(e) => { updatedocData(e.target.name, e.target.value) }}
                            defaultValue={props.isDoc[0]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Age <span className="error">{docErrors.age ? docErrors.age : null}</span></Form.Label>
                        <Form.Control name="age"
                            onChange={(e) => { updatedocData(e.target.name, e.target.value) }}
                            defaultValue={props.isDoc[2]}
                            type="number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="clinicLocation">
                        <Form.Label>Clinic/Hospital Location <span className="error">{docErrors.clinicLocation ? docErrors.clinicLocation : null}</span></Form.Label>
                        <Form.Control name="clinicLocation"
                            onChange={(e) => { updatedocData(e.target.name, e.target.value) }}
                            defaultValue={props.isDoc[3]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="clinicName">
                        <Form.Label>Clinic/Hospital Name <span className="error">{docErrors.clinicName ? docErrors.clinicName : null}</span></Form.Label>
                        <Form.Control name="clinicName"
                            onChange={(e) => { updatedocData(e.target.name, e.target.value) }}
                            defaultValue={props.isDoc[4]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="specialization">
                        <Form.Label>Your Specialization <span className="error">{docErrors.specialization ? docErrors.specialization : null}</span></Form.Label>
                        <Form.Control name="specialization"
                            onChange={(e) => { updatedocData(e.target.name, e.target.value) }}
                            defaultValue={props.isDoc[5]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contact">
                        <Form.Label>Contact Number <span className="error">{docErrors.contact ? docErrors.contact : null}</span></Form.Label>
                        <Form.Control name="contact"
                            onChange={(e) => { updatedocData(e.target.name, e.target.value) }}
                            defaultValue={props.isDoc[6]}
                            type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fees">
                        <Form.Label>Fees <span className="error">{docErrors.fees ? docErrors.fees : null}</span></Form.Label>
                        <Form.Control name="fees"
                            onChange={(e) => { updatedocData(e.target.name, e.target.value) }}
                            defaultValue={props.isDoc[7]}
                            type="number" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
}
export default EditProfile;