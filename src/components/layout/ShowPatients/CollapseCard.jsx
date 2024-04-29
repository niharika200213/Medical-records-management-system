import React from 'react'
import { useNavigate } from 'react-router-dom'
import user from "../../../assets/user.png"

const open = (i) => {
    let ele = document.querySelectorAll(".accord")[i]
    let ele2 = document.querySelectorAll(".accordHead")[i]
    if (ele.style.visibility === "visible") {
      ele.style.visibility = "collapse"
      ele.style.opacity = "0"
      ele.style.height = "0px"
      ele.style.padding = "0px 24px 0px 24px"
      ele.classList.add("closed")
      ele2.classList.add("closed")
    } else {
      ele.style.height = "100%"
      ele.style.visibility = "visible"
      ele.style.opacity = "1"
      ele.style.padding = "24px"
      ele.classList.remove("closed")
      ele2.classList.remove("closed")
    }
  }
const CollapseCard = (props) => {
    const navigate = useNavigate()
  return (      
    <>
        <div className="accordHead" onClick={() => { open(props.i) }}>
          <img src={user} alt="user"></img>
          <h2>{props.data[0]}</h2>
          <span className='age'> Age: {props.data[1]}yrs Blood Group: {props.data[3]}</span>
          <span className='downArr'><i className="fa-solid fa-angle-down"></i></span>
          <span style={{ float: "right", marginTop: "12px" }}><button onClick={()=>{navigate("/view-record/:"+props.data.addr)}}>View Reports</button> 
          {props.isDoc?<button style={{marginLeft:"2px"}} onClick={()=>{navigate("/add-report",{state:props.data})}}>Add Report</button>:<></>}</span>
        </div>
        <div className='accord'>
          <div>
            <h1>Allergies</h1>
            <p>{props.data[4]}</p>
            <h1>Remarks</h1>
            <p>{props.data[5]}</p>
          </div>
          {props.isDoc?<></>:<button style={{ backgroundColor: "#FF928B", borderRadius: "10px", border: "1px #FF928B solid", color: "white",
           padding: "4px 10px", fontWeight: "bolder" }} onClick={()=>navigate("/editProfile")}>Edit Profile</button>}
        </div>
    </>
  )
}

export default CollapseCard