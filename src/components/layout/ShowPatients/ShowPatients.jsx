import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { showPatients } from '../../../services/showPatients'
import user from "../../../assets/user.png"
import CollapseCard from './CollapseCard'
const ShowPatients = (props) => {
  const [data, setData] = useState([])
  let patData=[]
  const showData = async () => {
    if (props.isPat)
      patData[0] = {...props.isPat, addr:props.account};
    else
      patData = await showPatients();

    setData(patData)
    console.log(patData)
  }
  useEffect(() => {
    showData()
  }, [])

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
  if (data.length === 0)
    return (<><h1>No patients found</h1></>)
  return (
    <>
      {data.map((x, key) => {
        return <CollapseCard i={key} data={x} isDoc={props.isDoc}/>
      })}

    </>
  )
}

export default ShowPatients