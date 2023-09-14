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
    const reports = await viewReports(location.pathname.split(":")[1]);
    setState(reports);
    console.log(reports)
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