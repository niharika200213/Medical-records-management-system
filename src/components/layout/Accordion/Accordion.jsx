import React, { useEffect, useState } from 'react'
import { getDocByAddr } from "../../../services/doctors";


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

const Accordion = (props) => {
  const [repData, setRepData] = useState({
    date: "",
    docName: ""
  });

  useEffect(() => {
     reportData(props.data.doc).then(function(result) {
      setRepData({ date: result.date, docName: result.docName });
    });
  }, [])
  const reportData = async (addr) => {
    let date = new Date(props.data.date * 1000).toDateString();
    let doc = await getDocByAddr(addr);
    let docName = doc[0];
    return {date,docName}
  }
  return (
    <>
      <div className="accordHead" style={{ height: "55px", fontSize: "26px" }} onClick={() => { open(props.i) }}>
      {repData.docName}
        <span style={{ float: "right" }}>{repData.date}</span>
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