import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
  let navigate = useNavigate()
  useEffect(() => {
    showRep();
  }, [])
  const showRep = async () => {
    if (props.isPat)
      navigate(`/view-record/:${props.account}`)

    else if (props.isDoc)
      navigate('show-patients',{isDoc:props.isDoc});
    else
      navigate("/dashboard")
  }
  return (
    <>
    </>
  )
}

export default HomePage