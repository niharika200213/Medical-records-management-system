import React, { useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import user from "../../../assets/user2.png"
import { Link, useNavigate } from 'react-router-dom'
import { searchDoc, searchPat } from '../../../services/search'
import logo from "../../../assets/logo.svg"
const Navbar = (props) => {
  const [search, setSearch] = useState("")
  const docSearch = async(e) => {
    e.preventDefault();
    const res = await searchDoc(search)
    setSearch("");
    navigate("/search/doctor/"+search,{state:res});
    console.log(res)    
}
const patSearch = async(e) => {
    e.preventDefault();
    const res = await searchPat(search)
    setSearch("");
    navigate("/search/patient/"+search,{state:res});
    console.log(res)
}
  let navigate = useNavigate()

  return (
    <>
        <div className={styles.navMain}>
          <h1>
          <img src={logo} alt="logo" style={{width:"38px", marginRight:"20px", position:"relative", bottom:"2px"}}></img>
          MedDocs</h1>
          <ul>
            <li><Link to="/"> Home</Link></li>
            <li><Link to="/dashboard">About</Link></li>
            {!(props.isDoc || props.isPat)?<li><Link to="/register">Register</Link></li>:<></>}
            {(props.isDoc || props.isPat)?<li><Link to={props.isDoc?"/show-patients":"/access-doctors"}>{props.isDoc?"Patients":"Doctors"}</Link></li>:<></>}
            <li><Link to="/contact">Contact Us</Link></li>
            <li>{props.isPat?<Link to="/show-patients"><img style={{cursor:"pointer"}} src={user} alt="user"/></Link>:
              <Link to="/access-doctors"><img style={{cursor:"pointer"}} src={user} alt="user"/></Link>}</li>
          </ul>
        </div>
        <div className={styles.navBott}>
        <form onSubmit={props.isDoc?patSearch:docSearch}>
        <input className='inputClassic' style={{display:"inline", position:"relative", left:"75%", width:"300px", marginTop:"10px"}} value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search...'></input>
        <input type="submit" style={{display:"none"}}/>
        </form>
        </div>
    </>
  )
}

export default Navbar