import React from 'react'
import { useNavigate } from 'react-router-dom'
import user from "../../../assets/user.png"

const CardDoc = (props) => {
    const navigate = useNavigate()
    
  return (
    <>
        <div className='docCard' onClick={()=>{console.log(props);return(props.isDoc?<></>:navigate("/give-access",{state:props.state}))}}>
        <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
            <img src={user} alt="user"/>
            <div>
            <span>{props.state[0]}</span>
            <p>{props.state[5]}</p>
            </div>
        </div>
            <p><span>Contact:</span> {props.state[6]}</p><p><span>Age:</span> {props.state[2]} yrs</p>
            <p><span>Fees:</span> {props.state[7]}</p>
            <p><span>{props.state[4]}</span>, {props.state[3]}</p>
            {props.isDoc?<button style={{color:"#424874"}} onClick={()=>navigate("/editProfile")}>Edit Profile</button>:<></>}
        </div>
    </>
  )
}

export default CardDoc