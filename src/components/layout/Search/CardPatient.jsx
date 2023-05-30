import React from 'react'
import { useNavigate } from 'react-router-dom'
import user from "../../../assets/user.png"

const CardDoc = (props) => {
    const navigate = useNavigate()
    const access = ()=>{
        navigate("/view-record/"+props.state.addr,{state:props.state})
    }
  return (
    <>
        <div className='docCard' onClick={access}>
        <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
            <img src={user} alt="user"/>
            <div>
            <span>{props.state[0]}</span>
            <p>{props.state[5]}</p>
            </div>
        </div>
            <p><span>Blood Group:</span> {props.state[3]}</p><p><span>Age:</span> {props.state[1]} yrs</p>
            <p><span>Allergies</span> {props.state[4]}</p>
            <p><span>Remarks</span> {props.state[5]}</p>
        </div>
    </>
  )
}

export default CardDoc