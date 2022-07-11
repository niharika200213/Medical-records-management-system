import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../Accordion/Accordion'
import { viewReports } from '../../../services/doctors';

const ViewReportsDoctor = (props) => {
  let location = useLocation()
  let navigate = useNavigate()
  const [state, setState] = useState([])
  useEffect(() => {
    showRep();
  }, [])
  const showRep = async () => {
    const reports = await viewReports(location.pathname.split("/")[2]);
    console.log(reports);
    setState(reports)
  }
  const open = () => {
    console.log("clicked")
    let ele = document.querySelector(".accord")
    if (ele.style.opacity === "1") {
      ele.style.visibility = "collapse"
      ele.style.opacity = "0"
      ele.style.height = "0px"
    } else {
      ele.style.height = "100%"
      ele.style.visibility = "visible"
      ele.style.opacity = "1"
    }
  }
  if (state.length === 0)
    return (<><h1>No reports found</h1></>)
  else
    return (
      <>
        {state.map((arr, key) => {
          return <Accordion i={key} data={arr} key={key} />
        })}
        <div style={{ display: "flex" }}>
        </div>
      </>
    )
}

export default ViewReportsDoctor