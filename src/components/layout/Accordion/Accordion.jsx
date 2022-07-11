import React from 'react'
import user from "../../../assets/user.png"

const open = (i) => {
    console.log("clicked")
    console.log(document.getElementsByClassName("accord")[i])
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
const Accordion = (props) => {
  return (
    <>
        <div className="accordHead" style={{height:"55px", fontSize:"26px"}} onClick={() => { open(props.i) }}>
        {props.data[2]}
          <span style={{float:"right"}}>Thursday 14/05/2022 4:30 pm</span>
        </div>
        <div className='accord'>
          <div>
          <h1>Disorder</h1>
            <p>{props.data[2]}</p>
            <h1>Medication</h1>
            <p>{props.data[3]}</p>
            <h1>Remarks</h1>
            <p>{props.data[4]}</p>
          </div>
        </div>
    </>
  )
}

export default Accordion