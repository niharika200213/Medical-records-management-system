import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { giveAccess } from '../../../services/doctors'
import CardDoc from '../CardDoc/CardDoc'
import { verifyAccess } from '../../../services/verifyAccess'

const AccessPage = () => {
    let location = useLocation()
    const [check,setCheck] = useState(false)
    const [accessVerify, setAccessVerify] = useState(false)
    const [before,setBefore] = useState()
    useEffect(()=>{
        checkBefore()
    },[])

    const checkBefore = async()=>{
        let x = await verifyAccess(location.state.addr)
        setBefore(x)
    }

    const accessSend = async ()=>{
        if(!check){
            alert("Check the declaration")
        }
        else{
            let x = await giveAccess(location.state.addr)
            setAccessVerify(x)
        }
        
    }
  return (
    <>
        <div style={{display:"flex",justifyContent:"space-around",alignContent:"space-between", lineHeight:"2", fontSize:"20px"}}>
            <CardDoc state={location.state}/>
            <div style={{marginTop:"70px", width:"40%"}}>
                <h1>Guidelines</h1>
                <ol>
                    <li>
                        By giving access you provide view access to your doctor 
                    </li>
                    <li>
                        The doctor can view all your past reports and add a report
                    </li>
                    <li>
                        Also doctor can view your medical history like allergies and other data shared by you
                    </li>
                </ol>
            </div>
        </div>
        <label style={{width:"80%", marginLeft:"10%", padding:"4px"}}>
            <input type="checkbox" checked={check} onChange={()=>{setCheck(check=>!check)}}/>
            <span className="checkmark"></span>
            &ensp;  I hereby declare that I have read all the guidelines and confirm to provide access to my medical record to the aboive mentioned doctor.
        </label>
        <br></br>
        {(!accessVerify&&!before)?<button style={{backgroundColor:"#FF928B",color:"white",borderRadius:"50px",border:"#FF928B 1px solid",fontWeight:"bolder",fontSize:"22px",padding:"8px 16px", width:"200px",marginLeft:"40%",marginTop:"10px"}} onClick={accessSend}>
            Give Access
        </button>:<button style={{backgroundColor:"green",color:"white",borderRadius:"50px",border:"green 1px solid",fontWeight:"bolder",fontSize:"22px",padding:"8px 16px", width:"200px",marginLeft:"40%",marginTop:"10px"}}>
            Access Granted
        </button>}
    </>
  )

}

export default AccessPage