import React, { useEffect, useState } from 'react'
import { showPatients } from '../../../services/showPatients'
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
  }
  useEffect(() => {
    showData()
  }, [])

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