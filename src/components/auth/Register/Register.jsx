import React, { useEffect, useState } from 'react'
import styles from "./Register.module.css"
import img from "../../../assets/user.png"
import { regPat, regDoc } from "../../../services/doctors";
import { useNavigate } from "react-router-dom"

const Register = (props) => {
  const [role, setRole] = useState("Doctor")
  const [name, setName] = useState("")
  const [profilePic, setProfilePic] = useState("https://firebasestorage.googleapis.com/v0/b/meddocs-e21f8.appspot.com/o/files%2Fuser.png?alt=media&token=a49a5e6b-da83-4123-bc0d-da83c781e40a")
  const [age, setAge] = useState()
  const [cliLoc, setCliLoc] = useState("")
  const [cliName, setCliName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [pno, setPno] = useState()
  const [fees, setFees] = useState()
  const [blood, setBlood] = useState("")
  const [allergies, setAllergies] = useState("")
  const [remarks, setRemarks] = useState("")

  let navigate = useNavigate()
  useEffect(() => {
    if (props.isDoc || props.isPat) {
      navigate("/")
    }
  }, []);

  const register = async (e) => {
    e.preventDefault();
    let resp = false;
    if (role === "Doctor") {
      resp = await regDoc(name, profilePic, age, cliLoc, cliName, specialization, pno, fees, 0);
      if(resp)
        navigate("/")
      props.onComplete(true, false)
    }
    else if (role === "Patient") {
      resp = await regPat(name, age, profilePic, blood, allergies, remarks, 0);
      if(resp)
        navigate("/")
      props.onComplete(false, true)
    }
  }

  return (
    <>
      <div className={styles.flex}>
        <div>
          <h2>Select your Role</h2>
          <br/>
          <br/>
          <button className={role === "Doctor" ? styles.docBtn : `${styles.inActive} ${styles.docBtn}`} onClick={() => { setRole("Doctor") }}>Doctor</button>
          <button className={role === "Patient" ? styles.docBtn : `${styles.inActive} ${styles.docBtn}`} onClick={() => { setRole("Patient") }}>Patient</button>
          <div className={styles.profile}>
            <img src={img} alt="user"></img>
            <button className={styles.docBtn}>+ Add Profile Image</button>
          </div>
          <input className='inputClassic' placeholder='Enter your full name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
          <input className='inputClassic' type="number" placeholder='Enter your age' value={age} onChange={(e) => { setAge(e.target.value) }}></input>
        </div>
        <div>
          <h2>Enter Additional Details</h2>
          {role === "Doctor" ? <>
            <input className='inputClassic' placeholder='Enter Clinic Location' value={cliLoc} onChange={(e) => { setCliLoc(e.target.value) }}></input>
            <input className='inputClassic' placeholder='Enter Clinic Name' value={cliName} onChange={(e) => { setCliName(e.target.value) }}></input>
            <input className='inputClassic' placeholder='Enter Your Specialization' value={specialization} onChange={(e) => { setSpecialization(e.target.value) }}></input>
            <input className='inputClassic' type={"number"} placeholder='Enter Your Phone Number' value={pno} onChange={(e) => { setPno(e.target.value) }}></input>
            <input className='inputClassic' type={"number"} placeholder='Enter Your Fees' value={fees} onChange={(e) => { setFees(e.target.value) }}></input>
          </> : <>
            <input className='inputClassic' placeholder='Blood Group' value={blood} onChange={(e) => { setBlood(e.target.value) }}></input>
            <input className='inputClassic' placeholder='Allegries (if any)' value={allergies} onChange={(e) => { setAllergies(e.target.value) }}></input>
            <input className='inputClassic' placeholder='Remarks' value={remarks} onChange={(e) => { setRemarks(e.target.value) }}></input>
            <p style={{ fontSize: "14px", color: "gray" }}>Running Medications or any other information</p>
          </>}
        </div>
      </div>
      <button onClick={register} className={styles.docBtn} style={{ width: "15%", marginLeft: "42.5%", boxShadow: "3px 4px 8px rgba(255, 146, 139, 0.5)", fontWeight: "bold", borderRadius: "50px" }}>Next</button>
    </>
  )
}

export default Register