import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addReport } from '../../../services/doctors'
import CollapseCard from '../ShowPatients/CollapseCard'

const AddReport = () => {
    let location = useLocation()
    const navigate = useNavigate()
    const [dis,setDis] = useState("")
    const [medi,setMedi] = useState("")
    const [remarks,setRemarks] = useState("")
    const report = async ()=>{
        console.log(location.state.addr);
        let x = await addReport(location.state.addr,dis,medi,remarks)
        console.log(x);
        x?navigate("/show-patients"):console.log(false)

    }
    // addReport()
  return (
    <>
        <CollapseCard i={0} data={location.state}/>
        <div style={{marginLeft:"5%"}}>
        <h1>Disorder</h1>
        <input style={{width:"95%",marginTop:"0",marginBottom:"10px"}} className='inputClassic' value={dis} onChange={(e)=>setDis(e.target.value)} placeholder='Specify disorder like Flu, Fever ...'></input>
        <h1>Medication</h1>
        <input style={{width:"95%",marginTop:"0",marginBottom:"10px"}} className='inputClassic' value={medi} onChange={(e)=>setMedi(e.target.value)} placeholder='Suggest medications like red pill 5 times a day'></input>
        <h1>Remarks</h1>
        <textarea style={{width:"95%",marginTop:"0",marginBottom:"10px"}} className='inputClassic' value={remarks} onChange={(e)=>setRemarks(e.target.value)} placeholder='Enter any remarks'></textarea>
        </div>
        <button style={{backgroundColor:"#FF928B",color:"white",borderRadius:"50px",border:"#FF928B 1px solid",fontWeight:"bolder",fontSize:"22px",padding:"8px 16px", width:"200px",marginLeft:"40%",marginTop:"10px"}} onClick={()=>{report()}}>
            Issue Report
        </button>
    </>
  )
}

export default AddReport